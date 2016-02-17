var app = require('./lib/nmr.js');
var path = require('path');
app.add("bower", "install", function () {
  console.log("component o");
});
app.files(path.join(__dirname, '/lib'))
app.listen(8080, function () {
  console.log("Listening");
});
