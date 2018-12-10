var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/beltExamdb");
var app = express();
var server = app.listen(8000);

app.use(express.static(__dirname + '/angular-app/dist/angular-app'));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './static')));

var ReviewSchema = mongoose.Schema({
  name: { type: String, required: [true, "must provide a name"], minlength: [3, "your name must be 3 characters long"] },
  rating: { type: Number, required: [true, "rating must exist"], minimum: 1, maximum: 5 },
  review: { type: String, required: [true, "must provide some feedback"], minlength: [3, "your review must be 3 characters long"] }
});
mongoose.model("Review", ReviewSchema);
var Review = mongoose.model("Review");

var MovieSchema = new mongoose.Schema({
  title: { type: String, required: [true, 'title is required'], minlength: [3, "your title should be at least 3 characters!"] },
  name: { type: String, required: [true, "must provide your name"], minlength: [3, "your name must be 3 characters long"] },
  rating: { type: Number, required: [true, "rating must exist"], minimum: 1, maximum: 5 },
  content: { type: String, required: [true, "must provide some feedback"], minlength: [3, "your review must be 3 characters long"] },
  review: [ReviewSchema]
}, { timestamp: true });
mongoose.model('Movie', MovieSchema);
var Movie = mongoose.model('Movie');

app.get("/movies", (req, res) => {
  Movie.find({}, function (err, movies) {
    if (err) {
      console.log("no movies found", err);
      return res.json({ status: false, error: err });
    }
    else {
      return res.json({ status: true, movies: movies })
    }
  })
});

app.get("/movies/:id", (req, res) => {
  Movie.findOne({ _id: req.params.id }, function (err, movie) {
    if (err) {
      console.log("no movie found by id", err);
      return res.json({ status: false, error: err });
    }
    else {
      return res.json({ status: true, movie: movie });
    }
  })
});

app.post("/movies", (req, res) => {
  var movie = new Movie(req.body);
  movie.save(function (err, movie) {
    if (err) {
      console.log("Error saving new movie to DB", err);
      return res.json({ status: false, error: err });
    } else {
      console.log('successfully added a new movie to db');
      return res.json({ status: true, movie: movie });
    }
  })
});

app.post("/movies/:id/review", (req, res) => {
  Movie.findOne({ _id: req.params.id }, function (err, movie) {
    if (err) {
      return res.json({ status: false, error: err });
    }
    else {
      Review.create(req.body, function (err, review) {
        if (err) {
          console.log("Error saving movie review to DB", err);
          return res.json({ status: false, error: err });
        }
        movie.review.push(review);
        movie.save({ runValidations: false }, function (err, movie) {
          if (err) {
            console.log("Error saving movie review to DB", err);
            return res.json({ status: false, error: err });
          } else {
            console.log('successfully added a movie review to db');
            return res.json({ status: true, movie: movie });
          }
        })

      })
    }
  });
});

app.delete("/movies/:id/", function (req, res) {
  Movie.remove({ _id: req.params.id }, function (err) {
    if (err) {
      console.log("ERROR: ", err);
      return res.json({ message: "Error", error: err });
    }
    else {
      return res.json({ message: "Success" })
    }
  });
})






