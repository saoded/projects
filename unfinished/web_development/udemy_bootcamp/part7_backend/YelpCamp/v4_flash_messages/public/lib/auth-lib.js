var Campground = require("../../models/campground")
var Comment = require("../../models/comment")

var loginErrMsg = "Who R U even?";
var ownerErrMsg = "Only Shiva can destroy another's content!";
var dbErrMsg = "This one's on me lol";

//login verification to be used as middleware
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("error", loginErrMsg);
  res.redirect("/login");
}

function isOwnerLoggedIn(req, res, next) {
  if (!req.isAuthenticated()) {
    req.flash("error", loginErrMsg);
    res.redirect("back");
    return;
  }
  Campground.findById(req.params.id, (err, foundCamp) => {
    if (err) {
      req.flash("error", err.message);
      console.log(err);
      return;
    }
    if (foundCamp.creator.id.equals(req.user._id)) {
      return next();
    }
    req.flash("error", ownerErrMsg);
    res.redirect("back");
  });
}

function isCommentatorLoggedIn(req, res, next) {
  if (!req.isAuthenticated()) {
    req.flash("error", loginErrMsg);
    res.redirect("back");
    return;
  }
  Comment.findById(req.params.comment_id, (err, foundComment) => {
    if (err) {
      req.flash("error", err.message);
      console.log(err);
      return;
    }
    if (foundComment.author.id.equals(req.user._id)) {
      return next();
    }
    req.flash("error", ownerErrMsg);
    res.redirect("back");
  });
}

module.exports = {
  isLoggedIn: isLoggedIn,
  isOwnerLoggedIn: isOwnerLoggedIn,
  isCommentatorLoggedIn: isCommentatorLoggedIn,
};