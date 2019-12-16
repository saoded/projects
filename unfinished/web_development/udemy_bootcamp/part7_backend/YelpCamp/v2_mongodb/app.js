var express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose");

mongoose.connect(
  "mongodb://localhost:27017/yelp_camp",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

// SCHEMA SETUP
var Campground = require("./models/campground"),
  Comment = require("./models/comment");

// Initialize Data
// var seedDB = require("./seeds");
// seedDB();

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  // res.send("<h1>HOMEPAGE</h1>");
  res.render("landing");
});

app.get("/campgrounds", (req, res) => {
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
app.get("/campgrounds/new", (req, res) => {
  res.render("campgrounds/new");
});

// According to REST, the POST is made to the data display page
app.post("/campgrounds", (req, res) => {
  // get data from form and add to campgrounds array
  var addedCamp = {
    name: req.body.campName,
    image: req.body.image,
    description: req.body.desc
  }
  // save to DB
  Campground.create(addedCamp, (err, newCamp) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/campgrounds")
    }
  });
});

// SHOW
app.get("/campgrounds/:id", (req, res) => {
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

///////////////////////////////////////////////

app.get("/campgrounds/:id/comments/new", (req, res) => {
  Campground.findById(req.params.id, (err, foundCamp) => {
    if (err) {
      console.log(err);
    } else {
      res.render("comments/new", { camp: foundCamp });
    }
  });
});

app.post("/campgrounds/:id/comments", (req, res) => {
  // find in DB
  Campground.findById(req.params.id, (err, foundCamp) => {
    if (err) {
      console.log(err);
      res.redirect("/campgrounds");
    } else {
      // get data from form
      Comment.create(req.body.comment, (err, newComment) => {
        if (err) {
          console.log(err);
        } else {
          foundCamp.comments.push(newComment);
          foundCamp.save();
        }
        res.redirect("/campgrounds/" + foundCamp._id);
      });
    }
  });

});

///////////////////////////////////////////////

app.get("*", (req, res) => {
  res.redirect("/")
});

app.listen(3000, () => {
  console.log("YelpCamp Server has started");
});