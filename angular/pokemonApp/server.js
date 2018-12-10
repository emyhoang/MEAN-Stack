var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/taskdb");
var app = express();
var server = app.listen(8000);


app.use(express.static(__dirname + '/pokemon/dist/pokemon')); app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './static')));
app.set('views', path.join(__dirname, './views'));