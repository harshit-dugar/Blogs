const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
var _ = require("lodash"); //to convert into abc-def format so that url can 
//USED FOR ROUTING

const homeStartingContent = "L.g.";
const aboutContent = "H.";
const contactContent = "ibero.";

const app = express();

//MongoDB connection
const user=process.env.USER;
const password=process.env.PASS;
const url = "mongodb+srv://root:"+password+"@cluster0.ahjdzim.mongodb.net/blogDB";
mongoose.connect(url, {useNewUrlParser: true});
const postSchema = {
  title: String,
  content: String
}
const Post = mongoose.model("Post", postSchema);

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get('/',function(req,res){
  Post.find({}, function(err, posts){
    res.render("home", {
      startString: homeStartingContent,
      posts: posts
      });
  })
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
app.get('/posts/:postID',(req,res)=>{
  const requestedPostId = req.params.postID;
  Post.findById(requestedPostId, (err, post) => {
    res.render('post', {
      title: post.title,
      content: post.content
    })
    console.log(err);
  })
});

//adding a post to the database 
app.post('/compose',(req,res)=>{ 
  // console.log(req.body.postBody);
  const post = new Post({
    title: req.body.title,
    content:req.body.postBody
  });
  post.save(function(err){
    if (!err){
      res.redirect("/");
    }
  });
});

const port =process.env.PORT || 3000;
app.listen(port, function() {
  console.log("Server started on port "+port);
});