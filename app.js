const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const bodyParser = require('body-parser');
const fileUpload = require("express-fileupload");
app.use(fileUpload());
app.use(express.json());
app.use(bodyParser.json());
require("./db/connection")
app.use(express.static(__dirname + '/public'));


// getting  of user type
let token
const regesteredUser = (req,res,next)=>{
  token = req.headers.cookie
  if(token){
    if(token.includes('codingBlocksToken')){
      next();
    }
  }else{
    res.sendFile(path.join(__dirname+'/src/login.html'));
  }
}
const regesteredAdmin = (req,res,next)=>{
  token = req.headers.cookie
  if(token){
    if(token.includes('codingBlocksAdmin')){
      next();
    }
  }else{
    res.sendFile(path.join(__dirname+'/src/adminLogin.html'));
  }
}

router.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/src/home.html'));
});
router.get('/copyright',function(req,res){
  res.sendFile(path.join(__dirname+'/src/copyright.html'));
});
router.get('/privacy',function(req,res){
  res.sendFile(path.join(__dirname+'/src/privacy.html'));
});
router.get('/contact',function(req,res){
  res.sendFile(path.join(__dirname+'/src/contact.html'));
});
router.get('/signup',function(req,res){
  res.sendFile(path.join(__dirname+'/src/signup.html'));
});
router.get('/login',function(req,res){
  res.sendFile(path.join(__dirname+'/src/login.html'));
});
router.get('/admin',function(req,res){
  res.sendFile(path.join(__dirname+'/src/adminLogin.html'));
});
router.get('/userDetails',regesteredAdmin,function(req,res){
  res.sendFile(path.join(__dirname+'/src/userDetails.html'));
});
router.get('/adminDetails',regesteredAdmin,function(req,res){
  res.sendFile(path.join(__dirname+'/src/adminDetails.html'));
});
router.get('/topicDetails',regesteredAdmin,function(req,res){
  res.sendFile(path.join(__dirname+'/src/topicDetails.html'));
});
router.get('/articleDetails',regesteredAdmin,function(req,res){
  res.sendFile(path.join(__dirname+'/src/articleDetails.html'));
});
router.get('/newArticlesRequest',regesteredAdmin,function(req,res){
  res.sendFile(path.join(__dirname+'/src/newArticlesRequest.html'));
});
router.get('/editArticlesRequest',regesteredAdmin,function(req,res){
  res.sendFile(path.join(__dirname+'/src/editArticlesRequest.html'));
});
router.get('/content',function(req,res){
  res.sendFile(path.join(__dirname+'/src/content.html'));
});
router.get('/addArticle',regesteredUser,function(req,res){
  res.sendFile(path.join(__dirname+'/src/addArticle.html'));
});
router.get('/editArticle',regesteredUser,function(req,res){
  res.sendFile(path.join(__dirname+'/src/editArticle.html'));
});


app.use(require('./requests/signup'));
app.use(require('./requests/login'));
app.use(require('./requests/adminLogin'));
app.use(require('./requests/userDetails'));
app.use(require('./requests/adminDetails'));
app.use(require('./requests/topicDetails'));
app.use(require('./requests/articleDetails'));
app.use(require('./requests/newArticlesRequest'));
app.use(require('./requests/editArticlesRequest'));
app.use(require('./requests/navFoot'));
app.use(require('./requests/content'));
app.use(require('./requests/addArticle'));
app.use(require('./requests/editArticle'));
app.use(require('./requests/logout'));




//add the router
app.use('/', router);
app.listen(process.env.port || 3000);

console.log('Running at Port 3000');