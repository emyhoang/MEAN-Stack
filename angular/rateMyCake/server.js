var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/cakesdb");
var app = express();
var server = app.listen(8000);

app.use(express.static(__dirname + '/angular-app/dist/angular-app'));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './static')));

var RatingSchema = mongoose.Schema({
  rating: { type: Number, required: [true, "rating must exist"], minimum: 1, maximum: 5 },
  comment: { type: String, required: [true, "must provide some feedback"], minlength: [20, "your comment is too short! Should be at least 20 characters"] }
});
mongoose.model("Rating", RatingSchema);
var Rating = mongoose.model("Rating");

var CakeSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'name is required'], minlength: [2, "your name should be longer than 2 characters!"] },
  image: { type: String, required: [true, 'image is required'], minlength: [2, "your url is too short and should be 2 characters or more!"] },
  rating: [RatingSchema]
}, { timestamp: true });
mongoose.model('Cake', CakeSchema);
var Cake = mongoose.model('Cake');

app.get("/cakes", (req, res) => {
  Cake.find({}, function (err, cakes) {
    if (err) {
      console.log("no cakes found", err);
      res.json({ status: false, error: err });
    }
    else {
      res.json({ status: true, cakes: cakes })
    }
  })
});

app.get("/cakes/:id", (req, res) => {
  Cake.findOne({ _id: req.params.id }, function (err, cake) {
    if (err) {
      console.log("no cake found ", err);
      res.json({ status: false, error: err });
    }
    else {
      res.json({ status: true, cake: cake });
    }
  })
});

app.post("/cakes", (req, res) => {
  var cake = new Cake(req.body);
  cake.save(function (err, cake) {
    if (err) {
      console.log("Error saving cake to DB", err);
      res.json({ status: false, error: err });
    } else {
      console.log('successfully added a cake to db');
      res.json({ status: true, cake: cake });
    }
  })
});

app.post("/cakes/:id/rate", (req, res) => {
  Cake.findOne({ _id: req.params.id }, function (err, cake) {
    if (err) {
      return res.json({ status: false, error: err });
    }
    else {
      Rating.create(req.body, function (err, rating) {
        if (err) {
          console.log("Error saving cake rating to DB", err);
          return res.json({ status: false, error: err });
        }

        cake.rating.push(rating);
        cake.save({ runValidations: false }, function (err, cake) {
          if (err) {
            console.log("Error saving cake rating to DB", err);
            return res.json({ status: false, error: err });
          } else {
            console.log('successfully added a cake rating to db');
            return res.json({ status: true, cake: cake });
          }
        })

      })
    }
  });
});

// app.delete("/cakes/:id/", function (req, res) {
//   Cake.remove({ _id: req.params.id }, function (err) {
//     if (err) {
//       console.log("ERROR: ", err);
//       res.json({ message: "Error", error: err });
//     }
//     else {
//       res.json({ message: "Success" })
//     }
//   });
// })