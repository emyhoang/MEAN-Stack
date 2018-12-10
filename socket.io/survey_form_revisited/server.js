var express = require("express");
var path = require("path");
var bodyParser = require('body-parser');

var app = express();
var server = app.listen(8000);
var io = require('socket.io')(server);

app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  var locations = ['San Jose', "Seattle", "Texas"];
  var languages = ['Javascript', "Java", "Python"];
  res.render("index", { locations: locations, languages: languages });
})

io.on('connection', function (socket) {
  socket.on("post_form", function (data) {
    const luckyNumber = Math.floor(Math.random() * (1000 - 1 + 1)) + 1;
    socket.emit('updateMessage', { name: data.name, location: data.location, language: data.language, comments: data.comments });
    socket.emit('luckyNumber', luckyNumber);
  });
});





