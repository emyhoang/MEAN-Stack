var express = require("express");

var bodyParser = require('body-parser');

// path module -- try to figure out where and why we use this
var path = require("path");

// create the express app
var app = express();



// use it!
app.use(bodyParser.urlencoded({ extended: true }));
// static content
app.use(express.static(path.join(__dirname, "./static")));
// setting up ejs and our views folder
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');


// root route to render the index.ejs view
app.get('/', function (req, res) {
  var locations = ['San Jose', "Seattle", "Texas"];
  var languages = ['Javascript', "Java", "Python"];
  res.render("index", { locations: locations, languages: languages });
});

app.post('/result', function (req, res) {
  name = req.body.name
  location = req.body.location
  language = req.body.language
  comment = req.body.comment
  res.render("results", { name: name, location: location, language: language, comment: comment });
});



// tell the express app to listen on port 8000
app.listen(8001);
