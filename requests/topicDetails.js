const express = require('express')
const router = express.Router();
const conn = require('../db/connection');
// getting topics 
router.get('/api/topicDetails',async (req,res)=>{
    await conn.query(`SELECT * FROM topicDetails`,(err,results)=>{
        if (err) throw new err;
        else{
            res.status(200).json({"data":results});
        }
    });
})

// adding topics 
router.post('/api/topicDetails/addTopic',async (req,res)=>{
    const {topic,email,date} = req.body;
    if(!topic){
        res.status(203).json({"incomplete":"Add the topic"});
    }else{
        await conn.query(`INSERT INTO topicDetails VALUES("${topic}","${email}","${date}")`,(err,results)=>{
            if(err) {
                throw new err;
            }else{
                res.status(200).json({"added":"topic added successfully"});
            }
        });
    }
})



module.exports = router;