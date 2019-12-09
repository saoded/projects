var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground")
var Comment = require("../models/comment")
var auth = require("../public/lib/auth-lib");

router.get("/new", auth.isLoggedIn, (req, res) => {
  Campground.findById(req.params.id, (err, foundCamp) => {
    if (err) {
      console.log(err);
    } else {
      res.render("comments/new", { camp: foundCamp });
    }
  });
});

router.post("/", auth.isLoggedIn, (req, res) => {
  // find in DB
  Campground.findById(req.params.id, (err, foundCamp) => {
    if (err) {
      console.log(err);
      res.redirect("/campgrounds");
    } else {
      // sanitize comment
      console.log(req.body);
      req.body.comment.text = req.sanitize(req.body.comment.text);
      // get data from form
      Comment.create(req.body.comment, (err, newComment) => {
        if (err) {
          console.log(err);
        } else {
          // add username & ID to comment
          newComment.author.id = req.user._id
          newComment.author.username = req.user.username
          // save comment
          newComment.save()
          foundCamp.comments.push(newComment);
          foundCamp.save();
        }
        res.redirect("/campgrounds/" + foundCamp._id);
      });
    }
  });
});

module.exports = router;