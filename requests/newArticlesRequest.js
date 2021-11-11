const express = require('express')
const router = express.Router();
const conn = require('../db/connection');
router.get('/api/newArticlesRequest',async (req,res)=>{
    await conn.query(`SELECT name,heading,content1,image,content2,date,emailHeadingDate FROM userinfo,articledetails 
                    WHERE userinfo.email = articledetails.email AND status="pending" AND requestType="new"`,(err,results)=>{
        if (err){
            console.log(err)
        }
        else{
            res.status(200).json({"data":results});
        }
    });
})
router.post('/api/approveNewArticle',async (req,res)=>{
    const {emailHeadingDate,email,date} = req.body;
    await conn.query(`UPDATE articledetails SET status="complete" , requestType="none" WHERE emailHeadingdate="${emailHeadingDate}"`,(err,results)=>{
        if (err){
            console.log(err)
        }
        else{
            conn.query(`INSERT INTO approvedby VALUES("${emailHeadingDate}","${email}","${date}")`,(err,results)=>{
                if (err){
                    console.log(err)
                }
                else{
                    res.status(200).json({"approved":"article is  approved successfully"});
                }
            });
        }
    });
})



module.exports = router;