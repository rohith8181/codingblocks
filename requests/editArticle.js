// Module dependencies.
const express = require("express");
const router = express.Router();
const path = require('path');


const conn = require("../db/connection");

//use express static folder
router.use(express.static("./public"));

let time,date;
const month = ["January","Feburary","March","April","May","June","July","August","September","October","November","December"];
const dateFunction = ()=>{
    time = new Date();
    date = time.getDate()+" "+month[time.getMonth()]+" "+time.getFullYear()
    time = time.getDate()+" "+month[time.getMonth()]+" "+time.getFullYear() + time.getHours()+" "+time.getMinutes()+" "+time.getSeconds()
}
router.post("/api/editArticle", (req, res) => {
    dateFunction();
    let email = req.body.email;
    let topic = req.body.topic;
    let heading =req.body.heading;
    let content1 = req.body.content1;
    let content2 = req.body.content2;
    console.log(req.files.image)
    if(!req.files){
        conn.query(`INSERT INTO articledetails VALUES("${email}","${heading}","${content1}",${null},"${content2}","${topic}","pending","edit","${date}","${email+heading+time}")`,(err,results)=>{
            if (err){
                console.log(err)
            }
            else{
                res.sendFile(path.join(__dirname+'/thanks.html'));
            }
        });
        
    }else{
        var file = req.files.image; // here 'image' in Home.ejs form input name
        
        if (file.mimetype == "image/jpeg" || file.mimetype == "image/png" || file.mimetype == "image/gif"){
            //  var uuidname = uuid.v1(); // this is used for unique file name
            var imgsrc = "http://127.0.0.1:3000/images/" + email+time+file.name;
            
    
            file.mv("public/images/"+ email+time + file.name );
            conn.query(`INSERT INTO articledetails VALUES("${email}","${heading}","${content1}","${email+time+file.name}","${content2}","${topic}","pending","edit","${date}","${email+heading+time}")`,(err,results)=>{
                if(err){
                    console.log(err)
                }
                else{
                    res.sendFile(path.join(__dirname+'/thanks.html'));
                }
            });
        }
    }
    
});

module.exports = router;















