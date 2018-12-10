var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
const flash = require('express-flash');
var session = require('express-session');
const bcrypt = require('bcryptjs');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/loginRegistration');
// Use native promises
mongoose.Promise = global.Promise;

app.listen(8000)
app.use(session({
  secret: 'keyboardkitteh',
  resave: false,
  saveUninitialized: true,
}))
app.use(flash());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './static')));
app.set('trust proxy', 1)
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

var UserSchema = new mongoose.Schema({
  first_name: { type: String, required: [true, "Please enter a first name."], minlength: [2, "your first name should be longer!"] },
  last_name: { type: String, required: [true, "Please enter a last name."], minlength: [2, "your last name should be longer!"] },
  email: { type: String, required: [true, "Please enter a email."], minlength: [1, "your email should be longer!"] },
  password: { type: String, required: [true, "Please enter a password."], minlength: [8, "your password should be longer!"] },
  birthday: { type: Date, required: [true, "birthday is required"] },
}, {
    timestamps: true
  });
mongoose.model("User", UserSchema);
var User = mongoose.model("User");


app.get('/', function (req, res) {
  res.render('index');
});

app.post('/register', function (req, res) {

  if (req.body.password != req.body.confirm_password) {
    console.log('password does not match')
    req.flash('error', 'Passwords do not match');
    res.redirect('/')
  } else {
    var user = new User({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password,
      birthday: req.body.birthday
    });

    bcrypt.hash('req.body.password', 10).then(function (hashed_password) {
      user.password = hashed_password
      user.save(function (err) {
        if (err) {
          console.log("Error saving to DB", err);
          for (var key in err.errors) {
            req.flash('register', err.errors[key].message);
          }
          res.redirect('/');
        } else {
          console.log('successfully registered a user!');
          req.flash('success', 'You registered successfully, please login now!')
          res.redirect('/');
          console.log(user)
        }
      });
    }).catch(error => { return res.redirect('/') });
  }

});

app.post('/login', function (req, res) {

  User.findOne({ email: req.body.email }, function (err, user) {
    if (req.body.email.length <= 0 || req.body.password.length <= 0) {
      req.flash('noEmailPassword', 'Email or password can not be blank')
      res.redirect("/")
    }
    else if (user === null) {
      req.flash('email_or_pass', 'Invalid Credentials!')
      res.redirect("/")
    }
    else {
      if (user.password == req.body.password) {
        req.session.user = user;
        res.redirect('/main')
      }
      else {
        req.flash('email_or_pass', 'Invalid Credentials!')
        res.redirect("/")
      }
    }
  })
})


app.get('/main', function (req, res) {
  user = req.session.user;
  res.render('main', { user: user });

});





