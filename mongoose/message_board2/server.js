var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
const flash = require('express-flash');
var session = require('express-session');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/messageBoard');
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

var CommentSchema = new mongoose.Schema({
  name: String,
  comment: String,
}, {
    timestamps: true
  });
mongoose.model("Comment", CommentSchema);
var Comment = mongoose.model("Comment");

var MessageSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: [3, "your name should be longer!"] },
  message: { type: String, required: true, minlength: [5, "your message should be longer!"] },
  comment: [CommentSchema]
}, {
    timestamps: true
  });
mongoose.model("Message", MessageSchema);
var Message = mongoose.model("Message");

app.get('/', function (req, res) {
  Message.find({}, function (err, messages) {
    if (err)
      console.log("Error")
    else
      res.render('index', { allMessages: messages });
  });
});

app.post('/addMessage', function (req, res) {
  var message = new Message({
    name: req.body.name,
    message: req.body.message
  });
  message.save(function (err) {
    if (err) {
      console.log("Error saving to DB", err);
      for (var key in err.errors) {
        req.flash('addMessage', err.errors[key].message);
      }
      res.redirect('/');
    } else {
      console.log('successfully added a message!');
      res.redirect('/');
    }
  });
});

app.post('/addComment/:id', function (req, res) {
  console.log("COMMENT POST: ", req.body);

  Message.findOne({ _id: req.params.id }, function (err, message) {
    console.log("FOUND MESSAGE: ", message);
    var comment = new Comment({
      name: req.body.name,
      comment: req.body.comment,
      message: message._id
    });
    comment.save(function (err) {
      console.log("SAVE COMMENT, ", comment);
      if (err) {
        console.log("Error saving to DB", err);
        for (var key in err.errors) {
          req.flash('addComment', err.errors[key].message);
        }
        res.redirect('/');
      } else {
        console.log('successfully added a comment to a message!');
        console.log(comment)
        message.comment.push(comment);
        message.save(function (err) {
          console.log("SAVED MESSAGE: ", message)
          console.log("SAVED MESSAGE ERROR: ", err)
          res.redirect('/');
        })
      }
    });
  });
});