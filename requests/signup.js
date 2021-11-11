const express = require('express')
const router = express.Router();
const conn = require('../db/connection');

router.post('/api/signup',async (req,res)=>{
    const {name,email,password} = req.body;
    // if user left anything then sending 203 error 
    if(!name || !email || !password){
        res.status(203).json({"incomplete":"Fill the form completely"});
    }else{
        // checking if this email already exist 
        await conn.query(`SELECT * FROM userInfo WHERE email='${email}'`,(err,results)=>{
            if (err) throw new err;
            else if(results.length ==0){
                // if email didn't exist then inserting dtata into database 
                conn.query(`INSERT INTO userInfo (name,email,password) VALUES ('${name}', '${email}','${password}')`,(err,results)=>{
                    if(err){
                        res.status(500).json({"eror":'tehre is some error'});
                    }else{
                        res.status(200).json({"ye":"regestered successfully"});
                    }
                })
            }else{
                // if exist then sending code 401 
                res.status(401).json({"exist":"user exist"});
            }
        });
    }
})



module.exports = router;