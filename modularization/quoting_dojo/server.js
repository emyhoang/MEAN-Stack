var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
const flash = require('express-flash');
var session = require('express-session');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/quote_mongoose');
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


var QuoteSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: [6, "your name should be longer!"] },
  message: { type: String, required: true, minlength: [6, "your quote should be longer!"] }
}, { timestamps: true });

mongoose.model('Quote', QuoteSchema);
var Quote = mongoose.model('Quote')


app.get('/', function (req, res) {
  res.render('index');
});

app.post('/process', function (req, res) {
  var quote = new Quote({
    name: req.body.name,
    message: req.body.message
  });
  quote.save(function (err) {
    if (err) {
      console.log("Error saving to DB", err);
      for (var key in err.errors) {
        req.flash('addQuote', err.errors[key].message);
      }
      res.redirect('/');
    }
    else {
      console.log('successfully added a user!');
      res.redirect('/quotes');
    }
  })
})

app.get('/quotes', function (req, res) {
  Quote.find({}, function (err, quotes) {
    if (err)
      console.log("Error")
    else
      res.render('results', { allQuotes: quotes });
  });
})



