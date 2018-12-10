var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
const flash = require('express-flash');
var session = require('express-session');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mongoosedb');
// Use native promises
mongoose.Promise = global.Promise;

app.listen(8000)

app.use(session({
  secret: 'keyboardkitteh',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))
app.use(flash());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './static')));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');


var AnimalSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: [3, "your name should be longer!"] },
  favorite_food: { type: String, required: true, minlength: [2, "your favorite food should be longer!"] }
}, { timestamps: true });

mongoose.model('Animal', AnimalSchema);
var Animal = mongoose.model('Animal')

app.get('/', function (req, res) {
  Animal.find({}, function (err, animals) {
    if (err)
      console.log("Error")
    else
      res.render('index', { allMongooses: animals });
  });
});

app.get('/mongooses/new', function (req, res) {
  res.render('new');
});

app.post('/mongooses', function (req, res) {
  var animal = new Animal({
    name: req.body.name,
    favorite_food: req.body.favorite_food
  });
  animal.save(function (err) {
    if (err) {
      console.log("Error saving to DB", err);
      for (var key in err.errors) {
        req.flash('addAnimal', err.errors[key].message);
      }
      res.redirect('/mongooses/new');
    } else {
      console.log('successfully added a mongoose!');
      res.redirect('/');
    }
  });
});

app.get('/mongooses/:id', function (req, res) {
  mongoose = Animal.findOne({ _id: req.params.id }, function (err, animal) {
    res.render('show', { mongoose: animal });
  })
});

app.get('/mongooses/edit/:id', function (req, res) {
  mongoose = Animal.findOne({ _id: req.params.id }, function (err, animal) {
    res.render('edit', { mongoose: animal });
  })
});

app.get('/mongooses/edit/:id', function (req, res) {
  mongoose = Animal.findOne({ _id: req.params.id }, function (err, animal) {
    res.render('edit', { mongoose: animal });
  })
});

app.post('/mongooses/edit/:id', function (req, res) {
  Animal.update(
    { _id: req.params.id },
    {
      name: req.body.name,
      favorite_food: req.body.favorite_food
    },
    {
      runValidators: true
    },
    function (err) {
      if (err) {
        console.log('something went wrong');
        for (var key in err.errors) {
          req.flash('notUpdated', err.errors[key].message);
        }
        res.redirect(`/mongooses/edit/${req.params.id}`)
      } else {
        console.log('successfully changed a mongoose!');
        res.redirect(`/mongooses/${req.params.id}`);
      }
    })
})

app.post('/mongooses/destroy/:id', function (req, res) {
  Animal.remove({ _id: req.params.id }, function (err) {
    console.log("deleted successfully!");
    res.redirect('/');
  })
})