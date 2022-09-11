const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var _ = require("lodash"); //to convert into abc-def format so that url can 
//USED FOR ROUTING

const homeStartingContent = "L.g.";
const aboutContent = "H.";
const contactContent = "ibero.";

const app = express();
let posts = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get('/',function(req,res){
  res.render('home',{
    startString:homeStartingContent,
    posts:posts
  });
});

app.get('/about',function(req,res){
  res.render('about',{aboutString:aboutContent})
});

app.get('/contact',function(req,res){
  res.render('contact',{contactString:contactContent})
});

app.get('/compose',function(req,res){
  res.render('compose')
});

//creating a dynamic route for all posts
app.get('/posts/:postName',(req,res)=>{
  const requestedTitle = _.lowerCase(req.params.postName);
  posts.forEach(post=>{
    const storeTitle = _.lowerCase(post.title)
    if(storeTitle===requestedTitle){
      res.render('post',{
        title: post.title,
        content:post.content
      })
    }
  })
});
app.post('/compose',(req,res)=>{ 
  // console.log(req.body.postBody);
  const post = {
    title: req.body.title,
    content:req.body.postBody
  };
  posts.push(post);
  res.redirect('/');
});












app.listen(3000, function() {
  console.log("Server started on port 3000");
});