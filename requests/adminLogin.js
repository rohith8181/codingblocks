const express = require('express')
const router = express.Router();
const conn = require('../db/connection');
router.post('/api/adminLogin',async (req,res)=>{
    const {email,password} = req.body;
    if(!email || !password){
        res.status(203).json({"incomplete":"Fill the form completely"});
    }else{
        // checking email exist or not 
        await conn.query(`SELECT * FROM adminInfo WHERE email='${email}'`,(err,results)=>{
            if (err) throw new err;
            else if(results.length ==0){
                // if password doesnt match sending invalid credentials 
                res.status(404).json({"not found":"Invalid credentials"});
            }else{
                // if correct sending 200 ok status code 
                if(results[0].password == password){
                    res.status(200).json({"data":results});
                }else{
                    res.status(404).json({"not found":"Invalid credentials"});
                }
            }
        });
    }
})



module.exports = router;