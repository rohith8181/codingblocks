const express = require('express')
const router = express.Router();
const conn = require('../db/connection');
router.get('/api/userDetails',async (req,res)=>{
    await conn.query(`SELECT name,email FROM userInfo`,(err,results)=>{
        if (err) throw new err;
        else{
            res.status(200).json({"data":results});
        }
    });
})



module.exports = router;