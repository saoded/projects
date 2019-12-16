// Select all divs and give them a purple background
$("div").css("background", "purple");

// Select the divs with class "highlight" and make them 200px wide
$(".highlight").css("width", "200px")

// Select the div with id "third" and give it a orange border
$("#third").css("border", "1px solid orange")

// Bonus: Select the first div only and change its font color to pink
$("div:first-of-type").css("color", "pink")

var myCssClass = {
  color: "#AAAAAA",
  background: "#222222",
};

$("div").css(myCssClass);
