const express = require('express')
const router = express.Router();
const conn = require('../db/connection');
router.post('/api/login',async (req,res)=>{
    const {email,password} = req.body;
    if(!email || !password){
        // if user left empty anything then sending error status code 203 
        res.status(203).json({"incomplete":"Fill the form completely"});
    }else{
        // checking user exist of this email 
        await conn.query(`SELECT * FROM userInfo WHERE email='${email}'`,(err,results)=>{
            if (err) throw new err;
            else if(results.length ==0){
                //  password didn't match then sending 404 error 
                res.status(404).json({"not found":"Invalid credentials"});
            }else{
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