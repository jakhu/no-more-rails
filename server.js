// Sample server
// MINIMAL - not generated
const app = require('nmr');
const body = require('bodyparser')
const index = require('./routes/index')
const io = require('socket.io')(app.server);
const ejs = require('ejs');
const db = require('./db/db.js');
const bower = {
  app: 'bower',
  files: ["bower_components"],
  type: "app",
  cmd: "bower",
  actions: { install: exec('bower install') }
}
// port
// Defaults to 8080
// Can be string or number
const port = process.env.PORT || 8080
// Use on every request
app.use(body, 1)
// Used when requested
app.use(passport, 2)
app.routes('/', index)
app.db('db', db.init, db.config)
app.plug(io, app.server)

app.configure(function (set) {
  set.set('view-engine', ejs);
  set.set('views', path.join(app.pwd, 'views'))
  set.files(path.join(app.pwd, 'bower_components'))
  set.set('port', port)
})
app.component('bower', 'bower_components')
app.component('bower', 'install', 'bower install')
// Or use configure
app.component(bower)
// Update bower
app.run('bower', 'install')
// listen
app.listen(port, function (err) {
  console.log(`Listening on port ${port}`);
});
