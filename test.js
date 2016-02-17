var app = require('./lib/nmr.js');
app.add("bower", "o", function () {
  console.log("component o");
});
app.port(8080);
app.listen(function () {
  console.log("Listening");
});
