//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Welcome to this online website based daily journal. Enjoy your stay!";
const aboutContent = "This is Ayush Awasthi, the developer of this website. I am a web developer and a student of Computer Science Engineering at VIT Chennai. This is a project I made by using Angela Yu's Web Development course as a reference. Thank you for checking it out!";
const contactContent = "You can contact me using the following links:";
let posts = [];

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.get("/", function (req, res) {
  res.render("home", { startingContent: homeStartingContent, posts: posts });
});
app.get("/about", function (req, res) {
  res.render("about", { aboutContent: aboutContent });
});
app.get("/contact", function (req, res) {
  res.render("contact", { contactContent: contactContent });
});
app.get("/compose", function (req, res) {
  res.render("compose");
});
app.post("/compose", function (req, res) {
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };
  posts.push(post);
  res.redirect("/");
});
app.get("/posts/:topic", function (req, res) {//:topic is a route parameter, it basically means that whatever the user types after /posts/ will be stored in topic
  const requestedTitle = _.lowerCase(req.params.topic);
  posts.forEach(function (post) {
    const storedTitle = _.lowerCase(post.title);
    if (storedTitle === requestedTitle)
      res.render("post", {title:post.title, content:post.content});
  })
})
app.listen(process.env.PORT||3000, function () {
  console.log("Server started on port 3000");
});
