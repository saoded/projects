var express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  expressSanitizer = require("express-sanitizer"),
  mongoose = require("mongoose"),
  passport = require("passport"),
  localStrategy = require("passport-local");

//requiring routes
var campgroundRoutes = require("./routes/campgrounds"),
  commentRoutes = require("./routes/comments"),
  indexRoutes = require("./routes/index");

mongoose.connect(
  "mongodb://localhost:27017/yelp_camp",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

// SCHEMA SETUP
var Campground = require("./models/campground"),
  Comment = require("./models/comment"),
  User = require("./models/user");

// Initialize Data
// var seedDB = require("./seeds");
// seedDB();

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(expressSanitizer());

// PASSPORT CONFIGURATION
app.use(require("express-session")({
  secret: "Once again Rusty wins cutest dog!",
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
})

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

///////////////////////////////////////////////

app.get("*", (req, res) => {
  res.redirect("/")
});

app.listen(3000, () => {
  console.log("YelpCamp Server has started");
});