const express = require('express')
const router = express.Router();
const conn = require('../db/connection');
router.get('/api/articleDetails',async (req,res)=>{
    await conn.query(`SELECT admininfo.name AS nameOfAdmin,userinfo.name AS nameOfWritter,heading,content1,image,
                      content2,approvedby.date AS dateOfApproved , articledetails.emailHeadingDate FROM approvedby,userinfo,admininfo,articledetails 
                      WHERE userinfo.email = articledetails.email AND 
                      articledetails.emailHeadingDate = approvedby.emailHeadingDate AND
                      approvedby.email = admininfo.email`,(err,results)=>{
        if (err){
            console.log(err)
        }
        else{
            res.status(200).json({"data":results});
        }
    });
})

router.post('/api/deleteUnapprovedArticle',async (req,res)=>{
    const {emailHeadingDate} = req.body;
    await conn.query(`DELETE FROM articledetails WHERE emailHeadingDate = "${emailHeadingDate}"`,(err,results)=>{
        if (err){
            console.log(err)
        }
        else{
            res.status(200).json({"data":"deleted successfully"});
        }
    });
})

router.post('/api/deleteArticle',async (req,res)=>{
    const {emailHeadingDate} = req.body;
    await conn.query(`DELETE FROM commentSection WHERE emailHeadingDate = "${emailHeadingDate}"`,(err,results)=>{
        if (err){
            console.log(err)
        }
        else{
            conn.query(`DELETE FROM approvedby WHERE emailHeadingDate = "${emailHeadingDate}"`,(err,results)=>{
                if (err){
                    console.log(err)
                }
                else{
                    conn.query(`DELETE FROM articledetails WHERE emailHeadingDate = "${emailHeadingDate}"`,(err,results)=>{
                        if (err){
                            console.log(err)
                        }
                        else{
                            res.status(200).json({"data":"deleted successfully"});
                        }
                    });
                }
            });
        }
    });
})



module.exports = router;