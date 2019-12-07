var express = require("express"),
  app = express();

app.set("view engine", "ejs");

const DEFAULT_ATTR = 10;

var properties = {
  races: {
    human: {
      attributes: {
        strength: 1,
        dexterity: 1,
        constitution: 1,
        intelligence: 1,
        wisdom: 1,
        charisma: 1,
      }
    },
    elf: {
      attributes: {
        dexterity: 2,
        intelligence: 1,
      },
      features: ["Dark Vision"]
    },
    dwarf: {
      attributes: {
        constitution: 2,
        wisdom: 1,
      },
      features: ["Dark Vision"]
    },
  },
  classes: {
    fighter: {},
    rogue: {},
    wizard: {},
  },
}

var characterTemplate = {
  name: null,
  race: null,
  class: null,
  level: NaN,
  attributes: {
    strength: DEFAULT_ATTR,
    dexterity: DEFAULT_ATTR,
    constitution: DEFAULT_ATTR,
    intelligence: DEFAULT_ATTR,
    wisdom: DEFAULT_ATTR,
    charisma: DEFAULT_ATTR,
  },
  features: {},
};

app.get("/", (req, res) => {
  res.render("landing");
});

app.get("*", (req, res) => {
  res.redirect("/");
});

app.listen(3000, () => {
  console.log("5e Sheets Server has started");
});