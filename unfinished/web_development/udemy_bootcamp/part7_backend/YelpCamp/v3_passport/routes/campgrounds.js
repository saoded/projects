var express = require("express");
var router = express.Router();
var Campground = require("../models/campground")
var auth = require("../public/lib/auth-lib");

router.get("/", (req, res) => {
  Campground.find({}, (err, campgroundDB) => {
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds/index", { campgrounds: campgroundDB });
    }
  })
});

// According to REST, if /page displays data,
// /page/new should be the name of the page that adds to that data
router.get("/new", auth.isLoggedIn, (req, res) => {
  res.render("campgrounds/new");
});

// According to REST, the POST is made to the data display page
router.post("/", auth.isLoggedIn, (req, res) => {
  // get data from form and add to campgrounds array
  var addedCamp = {
    name: req.body.campName,
    image: req.body.image,
    description: req.sanitize(req.body.desc),
    creator: {
      id: req.user._id,
      username: req.user.username
    }
  }
  // save to DB
  Campground.create(addedCamp, (err, newCamp) => {
    if (err) {
      console.log(err);
    }
    res.redirect("/campgrounds")
  });
});

// SHOW
router.get("/:id", (req, res) => {
  //find the campground w/ id
  //render SHOW template page for relevant data
  Campground.findById(req.params.id).populate("comments").exec((err, foundCamp) => {
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds/show", { camp: foundCamp });
    }
  });
  // res.send("This shall become the SHOW page");
});

// UPDATE
router.get("/:id/edit", auth.isLoggedIn, (req, res) => {
  Campground.findById(req.params.id, (err, foundCamp) => {
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds/edit", { camp: foundCamp });
    }
  });
});

// DELETE
router.delete("/", auth.isLoggedIn, (req, res)=>{
  res.send("FUTURE DELETE PAGE!");
});

module.exports = router;