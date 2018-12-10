var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/1955API");
var app = express();
var server = app.listen(8000);

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './static')));
app.set('views', path.join(__dirname, './views'));


var Api1955Schema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 2 }
});
mongoose.model('Api1955', Api1955Schema);
var Api1955 = mongoose.model('Api1955');

app.get('/', function (req, res) {
  Api1955.find({}, function (err, babyBoomers) {
    if (err) {
      console.log("Returned error", err);
      res.json({ message: "Error", error: err });
    }
    else {
      res.json({ message: "success", data: babyBoomers })
    }
  })
})

app.get("/new/:name", function (req, res) {
  var babyBoomer = new Api1955({ name: req.params.name });
  babyBoomer.save(function (err, babyBoomer) {
    if (err) {
      console.log("Error: ", err);
      res.json({ message: "Error", error: err });
    }
    else {
      res.json({ message: "success" })
    }
  })
})

app.get("/remove/:name/", function (req, res) {
  Api1955.remove({ name: req.params.name }, function (err) {
    if (err) {
      console.log("ERROR: ", err);
      res.json({ message: "Error", error: err });
    }
    else {
      res.json({ message: "Success" })
    }
  });
})

app.get("/:name/", function (req, res) {
  Api1955.find({ name: req.params.name }, function (err, babyBoomer) {
    if (err) {
      console.log("ERROR: ", err);
      res.json({ message: "ERROR", error: err });
    }
    else {
      res.json({ message: "success", user: babyBoomer });
    }
  })
})


