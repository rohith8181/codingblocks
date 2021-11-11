const express = require('express')
const router = express.Router();
const conn = require('../db/connection');
router.get('/api/editArticlesRequest',async (req,res)=>{
    await conn.query(`SELECT name,heading,content1,image,content2,date, articleDetails.emailHeadingDate FROM userinfo,articledetails
                    WHERE userinfo.email = articledetails.email AND status="pending" AND requestType="edit"`,(err,results)=>{
        if (err){
            console.log(err)
        }
        else{
            res.status(200).json({"data":results});
        }
    });
})

router.post('/api/approveEditArticle',async (req,res)=>{
    const {emailHeadingDate,emailOfAdmin,dateOfApproved,heading,emailOfWritter,content1,content2,image,dateOfRequest} = req.body;
    await conn.query(`SELECT emailHeadingDate FROM articledetails WHERE status="complete" AND heading="${heading}"`,(err,results)=>{
        if (err){
            console.log(err)
        }
        else{
            let oldEmailHeadingDate = results[0].emailHeadingDate;
            conn.query(`DELETE FROM commentsection WHERE emailHeadingDate = "${oldEmailHeadingDate}"`,(err,results)=>{
                if (err){
                    console.log(err)
                }
                else{
                    conn.query(`UPDATE approvedby SET emailHeadingdate="${emailHeadingDate}" , email="${emailOfAdmin}" ,date="${dateOfApproved}" WHERE emailHeadingdate="${oldEmailHeadingDate}"`,(err,results2)=>{
                        if (err){
                            console.log(err)
                        }
                        else{
                            conn.query(`DELETE FROM articledetails WHERE emailHeadingDate = "${oldEmailHeadingDate}"`,(err,results2)=>{
                                if (err){
                                    console.log(err)
                                }
                                else{
                                    conn.query(`UPDATE articledetails SET status="complete" , requestType="none" WHERE emailHeadingdate="${emailHeadingDate}"`,(err,results2)=>{
                                        if (err){
                                            console.log(err)
                                        }
                                        else{
                                            res.status(200).json({"changed":"edites successfully"});
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
            
        }
    });
})


module.exports = router;