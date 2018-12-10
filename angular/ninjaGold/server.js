const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ninjaGold');

const app = express();
var server = app.listen(8000)

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './public/dist/public')));

var GameSchema = new mongoose.Schema({
  score: { type: Number, default: 0 }
}, {
    timestamps: true
  });
mongoose.model('Game', GameSchema);
var Game = mongoose.model('Game');

app.get('/game', (req, res) => {
  Game.find({}, function (err, game) {
    if (err) {
      console.log("no game found", err);
      res.json({ message: "Error", error: err });
    }
    else {
      res.json({ game: game })
    }
  })
})

app.post('/game', (req, res) => {
  var game = new Game(req.body);
  game.save(function (err, game) {
    if (err) {
      let data = {}
      for (let key in err.errors) {
        data[key] = err.errors[key].message;
      }
      res.json({ status: false, message: data });
    } else {
      res.json({ status: true, game: game });
    }
  })
})

app.put('/update/:id', (req, res) => {
  Game.findOneAndUpdate({ _id: req.params.id }, { $set: { 'score': req.body.score } }, (err, game) => {
    if (err) {
      console.log(err)
    } else {
      console.log(game)
      res.json({ status: true, game });
    }
  })
});

app.delete("/remove/:id/", function (req, res) {
  Game.remove({ _id: req.params.id }, function (err) {
    if (err) {
      console.log("ERROR: ", err);
      res.json({ message: "Error", error: err });
    }
    else {
      res.json({ message: "Success" })
    }
  });
})

app.get("/topthree", function (req, res) {
  Game.find({}).limit(3).sort({ 'score': -1 }).exec((err, games) => {
    if (err) {
      let data = {}
      for (let key in err.errors) {
        data[key] = err.errors[key].message;
      }
      res.json({ status: false, message: data });
    } else {
      res.json({ status: true, games: games });
    }
  });

})