var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/taskdb");
var app = express();
var server = app.listen(8000);

app.use(express.static(__dirname + '/angular/dist/angular'));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './static')));
app.set('views', path.join(__dirname, './views'));


var TaskSchema = new mongoose.Schema({
  title: { type: String, default: "" },
  description: { type: String, default: "" },
  completed: { type: Boolean, required: true, default: true }
}, {
    timestamps: true
  });
mongoose.model('Task', TaskSchema);
var Task = mongoose.model('Task');


app.get('/tasks', function (req, res) {
  Task.find({}, function (err, tasks) {
    if (err) {
      console.log("Returned error", err);
      res.json({ message: "Error", error: err });
    }
    else {
      res.json({ message: "success", data: tasks })
    }
  })
})

app.get("/tasks/:id", function (req, res) {
  Task.findOne({ _id: req.params.id }, function (err, task) {
    if (err) {
      console.log("ERROR: ", err);
      res.json({ message: "ERROR", error: err });
    }
    else {
      res.json({ message: "success", data: task });
    }
  })
})

app.post('/tasks', function (req, res) {
  var task = new Task(req.body);
  task.save(function (err, task) {
    if (err) {
      console.log("Error saving to DB", err);
      res.json({ message: "Error", error: err });
    } else {
      console.log('successfully');
      res.json({ message: "success", task: task });
    }
  });
});


app.delete("/tasks/:id/", function (req, res) {
  Task.remove({ _id: req.params.id }, function (err) {
    if (err) {
      console.log("ERROR: ", err);
      res.json({ message: "Error", error: err });
    }
    else {
      res.json({ message: "Success" })
    }
  });
})

app.put('/tasks/:id', function (req, res) {
  Task.findOneAndUpdate({ _id: req.params.id }, { $set: { title: req.body.title, description: req.body.description } }, function (err, tasks) {
    if (err) {
      console.log(err);
    }
    else {
      res.json(tasks);
    }
  });
})





