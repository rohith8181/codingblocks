// Module dependencies.
const express = require("express");
const router = express.Router();

const conn = require("../db/connection");

//use express static folder
router.use(express.static("./public"));

router.get('/api/logout',(req,res)=>{
    res.clearCookie('codingBlocksToken',{path:'/'});
    res.clearCookie('codingBlocksAdmin',{path:'/'});
    console.log("logout console")
    res.status(200).send("user logout");
})

module.exports = router;
