var Campground = require("../../models/campground")
var Comment = require("../../models/comment")

//login verification to be used as middleware
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

function isOwnerLoggedIn(req, res, next) {
  if (!req.isAuthenticated()) {
    res.redirect("back");
    return;
  }
  Campground.findById(req.params.id, (err, foundCamp) => {
    if (err) {
      console.log(err);
      return;
    }
    if (foundCamp.creator.id.equals(req.user._id)) {
      return next();
    }
    res.redirect("back");
  });
}

function isCommentatorLoggedIn(req, res, next) {
  if (!req.isAuthenticated()) {
    res.redirect("back");
    return;
  }
  Comment.findById(req.params.comment_id, (err, foundComment) => {
    if (err) {
      console.log(err);
      return;
    }
    if (foundComment.author.id.equals(req.user._id)) {
      return next();
    }
    res.redirect("back");
  });
}

module.exports = {
  isLoggedIn: isLoggedIn,
  isOwnerLoggedIn: isOwnerLoggedIn,
  isCommentatorLoggedIn: isCommentatorLoggedIn,
};