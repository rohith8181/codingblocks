const express = require('express')
const router = express.Router();
const conn = require('../db/connection');

router.get('/api/navFoot',async (req,res)=>{
    await conn.query(`SELECT heading,topic FROM articledetails WHERE STATUS='complete'`,(err,results)=>{
        if (err){
            console.log(err)
        }
        else{
            res.status(200).json({"data":results});
        }
    });
})

router.post('/api/searchBar',async (req,res)=>{
    const {heading} = req.body ;
    await conn.query(`SELECT heading FROM articledetails WHERE status="complete" AND heading LIKE'%${heading}%'`,(err,results)=>{
        if (err){
            console.log(err)
        }
        else{
            res.status(200).json({"data":results});
        }
    });
})


module.exports = router;