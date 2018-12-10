var express = require("express");
var path = require("path");

var app = express();
var server = app.listen(8000);
var io = require('socket.io')(server);

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.render("index");
})

io.on('connection', function (socket) {
  var count = 0;

  socket.on("countButton", function (data) {
    count++;
    socket.emit('updateCount', { count: count });
  });

  socket.on("resetCount", function (data) {
    count = 0;
    socket.emit('reset', { count: count });
  });

});




