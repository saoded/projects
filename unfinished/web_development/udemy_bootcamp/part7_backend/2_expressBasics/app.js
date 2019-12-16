var express = require("express");

var app = express();

var sfxDict = {
  pig: '"Oink"',
  cow: '"Moo"',
  dog: '"Woof Woof!"',
  cat: '"Nobody likes you"',
  fish: '"..."',
};

app.get("/", function(req, res){
  res.send("Hi there, welcome to my assignment :)")
});

app.get("/speak/:animal", function(req, res){
  var animal = req.params.animal.toLowerCase();
  var sfx = sfxDict[animal];
  if(sfx === undefined){
    sfx = '"FUCK YOU!"'
  }
  // var sfx = getSound(animal);
  res.send("the " + animal + " says " + sfx);
});

app.get("/repeat/:repeatedStr/:nRepeats", function(req, res){
  var nRepeats = parseInt(req.params.nRepeats);
  if(isNaN(nRepeats)){
    res.send("AIN'T A FUCKIN NUMBER!");
    return;
  }
  
  if(nRepeats < 1){
    res.send("U MESSIN W/ ME BIATCH?");
    return;
  }

  // var repeatedStr = req.params.repeatedStr;
  // var resStr = repeatedStr;
  // for (let i = 1; i < nRepeats; ++i) {
  //   resStr += " " + repeatedStr;    
  // }
  // res.send(resStr);
  res.send(stringRepeat(req.params.repeatedStr, nRepeats));
});

app.get("*", function(req, res){
  res.send("Sorry, page not found... What u doin w/ ur life lol??");
});

app.listen(3000);

// function getSound (animal){
//   switch(animal){
//     case "pig":
//       return "Oink";
//     case "cow":
//       return "MOOOO";
//     case "dog":
//       return "Woof Woof!";
//     default:
//       return "FUCK YOU!";
//   }
// }

function stringRepeat(str, nReps){
  var resStr = str;
  for (let i = 1; i < nReps; ++i) {
    resStr += " " + str;    
  }
  return resStr;
}