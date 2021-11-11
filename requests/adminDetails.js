const express = require('express')
const router = express.Router();
const conn = require('../db/connection');

// getting admin details 
router.get('/api/adminDetails',async (req,res)=>{
    await conn.query(`SELECT name,email FROM adminInfo`,(err,results)=>{
        if (err) throw new err;
        else{
            res.status(200).json({"data":results});
        }
    });
})


// making user admin 
router.post('/api/adminDetails/makeAdmin',async (req,res)=>{
    const {name,email,password} = req.body;
    if(!name || !email || !password){
        res.status(203).json({"incomplete":"Fill all the details"});
    }else{
        // checking if email exist or not 
        await conn.query(`SELECT * FROM adminInfo WHERE email='${email}'`,(err,results)=>{
            if(err){
                if(err){
                    res.status(500).json({"error":"internal error"})
                }
            }else if(results.length != 0){
                // if user exist of enterd email then seding code 401 
                res.status(401).json({"Already exist":"The admin with this email already exist"})
            }else{
                // if email doesn't exist then inserting new data 
                conn.query(`INSERT INTO adminInfo VALUES ('${name}','${email}','${password}')`,(err,results)=>{
                    if(err) {
                        res.status(500).json({"error":"internal error"})
                    }else{
                        conn.query(`INSERT INTO userInfo VALUES ('${name}','${email}','${password}')`,(err,results)=>{
                            if(err) {
                                res.status(500).json({"error":"internal error"})
                            }else{
                                res.status(200).json({"added":"admin added successfully"});
                            }
                        });
                        
                    }
                });
            }
        });
        
    }
})


module.exports = router;