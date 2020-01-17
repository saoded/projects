var express = require("express");
var router = express.Router({ mergeParams: true });
var Campground = require("../models/campground")
var Comment = require("../models/comment")
var auth = require("../public/lib/auth-lib");

router.get("/new", auth.isLoggedIn, (req, res) => {
  Campground.findById(req.params.id, (err, foundCamp) => {
    if (err) {
      console.log(err);
      req.flash("error", err.message);
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
      req.flash("error", err.message);
      res.redirect("/campgrounds");
      return;
    }
    // sanitize comment
    req.body.comment.text = req.sanitize(req.body.comment.text);
    // get data from form
    Comment.create(req.body.comment, (err, newComment) => {
      if (err) {
        console.log(err);
        req.flash("error", err.message);
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
  });
});

// UPDATE
router.get("/:comment_id/edit", auth.isCommentatorLoggedIn, (req, res) => {
  console.log(req.params.comment_id)
  Comment.findById(req.params.comment_id, (err, foundComment) => {
    if (err) {
      console.log(err)
      req.flash("error", err.message);
      res.redirect("back");
      return;
    }
    res.render("comments/edit", { camp_id: req.params.id, comment: foundComment });
  });
});

// PUT
router.put("/:comment_id", auth.isCommentatorLoggedIn, (req, res) => {
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updatedComment) => {
    if (err) {
      console.log(err)
      req.flash("error", err.message);
      res.redirect("back");
      return;
    }
    res.redirect("/campgrounds/" + req.params.id);
  });
});

// DESTROY
router.delete("/:comment_id", auth.isCommentatorLoggedIn, (req, res) => {
  Comment.findByIdAndRemove(req.params.comment_id, (err, removedComment) => {
    if (err) {
      console.log(err);
      req.flash("error", err.message);
      res.redirect("back");
      return;
    }
    res.redirect("/campgrounds/" + req.params.id);
  })
});

module.exports = router;