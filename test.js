var app = require('./app.js');
app.add("bower", "o", function () {
  console.log("component o");
});
app.components().bower.o();
app.listen(8080, function () {
  console.log("Listening");
});
