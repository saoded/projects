faker = require("faker");

console.log("=======================\nWelcome to Temmy's Shop\n    Node.js Branch\n=======================")
for (let i = 0; i < 10; ++i) {
  console.log(faker.fake("{{commerce.productName}} - {{commerce.price}}₪"))  
}