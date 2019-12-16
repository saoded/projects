var express = require("express");
var app = express();
var bodyParser = require("body-parser")

var campgrounds = [
  { name: "Salmon Creek", image: "https://images.pexels.com/photos/1061640/pexels-photo-1061640.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" },
  { name: "Granite Hill", image: "https://images.pexels.com/photos/1687845/pexels-photo-1687845.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" },
  { name: "Mountain Goat's Rest", image: "https://images.pexels.com/photos/699558/pexels-photo-699558.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" },
];

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  // res.send("<h1>HOMEPAGE</h1>");
  res.render("landing");
});

app.get("/campgrounds", (req, res) => {
  res.render("campgrounds", { campgrounds: campgrounds });
});

// According to REST, if /page displays data,
// /page/new should be the name of the page that adds to that data
app.get("/campgrounds/new", (req, res) => {
  res.render("addCamp");
});

app.get("*", (req, res) => {
  res.redirect("/")
});

// According to REST, the POST is made to the data display page
app.post("/campgrounds", (req, res) => {
  //get data from form and add to campgrounds array
  var name = req.body.campName;
  var imageUrl = req.body.image;
  campgrounds.push({
    name: name,
    image: imageUrl,
  });

  res.redirect("/campgrounds")
});

app.listen(3000, () => {
  console.log("YelpCamp Server has started");
});