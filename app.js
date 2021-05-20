//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque tristique, tortor ut hendrerit consectetur, turpis arcu blandit ipsum, et pretium elit neque iaculis urna. Duis gravida quam in mollis sollicitudin. Vivamus diam tortor, convallis eget libero nec, lacinia vestibulum ligula. Duis vel eleifend leo, quis vestibulum metus. Mauris eleifend neque lobortis rhoncus viverra. Sed sollicitudin nisi vel est iaculis, sit amet placerat neque aliquet. Vestibulum et scelerisque nisi. Donec scelerisque odio in nulla ultrices, non volutpat nunc mollis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vivamus malesuada ut justo sit amet condimentum. Ut nec lacus nec ante ultricies efficitur ut quis erat.";
const aboutContent = "Suspendisse varius turpis dictum augue porttitor dignissim. Mauris interdum pharetra egestas. Nulla mollis, velit consequat vehicula tempor, sem lacus rutrum mi, eu fringilla augue libero id magna. Aliquam placerat tincidunt lacus, sit amet pellentesque metus rhoncus vitae. Pellentesque vel mollis massa. Nunc tellus lectus, maximus quis enim eget, cursus fringilla metus. Proin velit sapien, imperdiet at maximus at, iaculis eget odio. Duis purus sapien, scelerisque ac rhoncus consectetur, semper eget tortor. Aenean ullamcorper sem nisi, eu euismod mauris vulputate ac. Sed feugiat laoreet sem, eu vulputate erat laoreet eget. Duis finibus varius rhoncus. Duis sed turpis mauris. Etiam id vestibulum quam, ac volutpat purus.";
const contactContent = "Cras ornare gravida nisl, eget vulputate nunc iaculis quis. Cras placerat nisi tellus, a tincidunt sapien dignissim id. Sed id malesuada augue, maximus ultrices sapien. Morbi gravida porttitor ultricies. Aenean aliquet turpis sed urna posuere, sit amet accumsan nibh placerat. Morbi eleifend nisi auctor vestibulum dignissim. Nullam nec feugiat ante, vitae placerat augue. Sed sem leo, commodo in tempor et, dignissim vitae lacus. Quisque fringilla blandit nunc, sit amet tincidunt tellus venenatis posuere. Mauris mollis suscipit ipsum, eu rhoncus nibh iaculis vel. Donec lobortis tellus justo, posuere ornare risus feugiat et. Nullam a metus lectus. Phasellus pulvinar viverra sollicitudin.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts = [];
app.get("/",function(req,res)
{
    res.render("home",{homeStartingContent : homeStartingContent, posts : posts});
});
app.get("/about",function(req,res)
{
    res.render("about",{aboutContent : aboutContent});
});
app.get("/contact",function(req,res)
{
    res.render("contact",{contactContent : contactContent});
});
app.get("/compose",function(req,res)
{
    res.render("compose");
});
app.get("/posts/:postTitle",function(req,res)
{
    const tempTitle = _.lowerCase(req.params.postTitle);
    for(let i=0;i<posts.length;i++)
    {
        if(_.lowerCase(posts[i].postTitle) === tempTitle)
            console.log("Match found");
    }
});
app.post("/compose",function(req,res)
{
    const content = {
        postTitle : req.body.postTitle,
        postContent : req.body.postContent
    }; 
    posts.push(content);
    res.redirect("/");
});

app.listen(3000,function(){
    console.log("Server started on port 3000.");
});








