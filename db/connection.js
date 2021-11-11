const mysql = require('mysql');
const conn = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"codingBlocks",
    connectionLimit:10
})

conn.connect((err)=>{
    if (err){ 
        console.log(err)
    }else{
        console.log("connected");
    }
})


module.exports = conn;