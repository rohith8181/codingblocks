const express = require('express')
const router = express.Router();
const conn = require('../db/connection');

router.post('/api/content',async (req,res)=>{
    const {heading} = req.body;
    await conn.query(`SELECT approvedBy.emailHeadingDate ,userinfo.name,heading,content1,image,topic,
                        content2,approvedby.date FROM approvedby,userinfo,articledetails 
                        WHERE userinfo.email = articledetails.email AND heading="${heading}" AND
                        articledetails.emailHeadingDate = approvedby.emailHeadingDate`,(err,results)=>{
        if (err){
            console.log(err)
        }
        else{
            res.status(200).json({"details":results});
        }
    });
})

router.post('/api/content/addComment',async (req,res)=>{
    const {key,email,comment,time} = req.body;
    await conn.query(`INSERT INTO commentsection VALUES("${key}","${email}","${comment}","${time}")`,(err,results)=>{
        if (err){
            console.log(err);
        }
        else{
            res.status(200).json({"added":"comment added successfully"});
        }
    });
})


router.post('/api/content/getComments',async (req,res)=>{
    const {heading} = req.body;
    await conn.query(`SELECT commentsection.email,comment FROM commentsection, articledetails 
        WHERE commentsection.emailHeadingDate = articledetails.emailHeadingdate AND heading="${heading}" ORDER BY time DESC`,(err,results)=>{
        if (err){
            console.log(err)
        }
        else{
            res.status(200).json({"data":results});
        }
    });
})

module.exports = router;