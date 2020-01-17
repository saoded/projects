var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
// var auth = require("../public/lib/auth-lib");

router.get("/", (req, res) => {
  // res.send("<h1>HOMEPAGE</h1>");
  res.render("landing");
});

//show register form
router.get("/register", (req, res) => {
  res.render("register");
});

//handle sign up logic
router.post("/register", (req, res) => {
  var newUser = new User({ username: req.body.username });
  User.register(newUser, req.body.password, (err, user) => {
    if (err) {
      console.log(err);
      req.flash("error", err.message);
      return res.redirect("/register");
    }
    passport.authenticate("local")(req, res, () => {
      req.flash("success", "We hope you enjoy our service (;");
      res.redirect("/campgrounds");
    });
  });
});

//show login form
router.get("/login", (req, res) => {
  req.flash("success", "Greetings ^^");
  res.render("login");
});

//handle login logic
router.post("/login", passport.authenticate("local",
{
  successRedirect: "/campgrounds",
  failureRedirect: "/login",
}));

//logout logic
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("info", "LATER BRO :*")
  res.redirect("/campgrounds");
});

module.exports = router;