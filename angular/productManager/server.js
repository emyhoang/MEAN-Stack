var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/productManagerdb");
var app = express();
var server = app.listen(8000);

app.use(express.static(__dirname + '/angular-app/dist/angular-app'));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './static')));

var ProductSchema = new mongoose.Schema({
  title: { type: String, required: [true, 'name is required'], minlength: [2, "your name should be longer than 2 characters!"] },
  price: { type: Number, required: [true, 'price is required'] },
  image: { type: String, required: [true, 'image is required'], minlength: [2, "your url is too short and should be 2 characters or more!"] }
}, { timestamp: true });
mongoose.model('Product', ProductSchema);
var Product = mongoose.model('Product');

// app.all("*", (req, res, next) => {
//   res.sendFile(path.resolve("./angular-app/dist/angular-app/index.html"))
// });

app.get("/products", (req, res) => {
  Product.find({}, function (err, products) {
    if (err) {
      console.log("no products found", err);
      return res.json({ status: false, error: err });
    }
    else {
      return res.json({ status: true, products: products })
    }
  })
});

app.get("/products/:id", (req, res) => {
  Product.findOne({ _id: req.params.id }, function (err, product) {
    if (err) {
      console.log("no product found by id ", err);
      return res.json({ status: false, error: err });
    }
    else {
      return res.json({ status: true, product: product });
    }
  })
});

app.post("/products", (req, res) => {
  var product = new Product(req.body);
  product.save(function (err, product) {
    if (err) {
      console.log("Error saving product to DB", err);
      return res.json({ status: false, error: err });
    } else {
      console.log('successfully added a product to db');
      return res.json({ status: true, product: product });
    }
  })
});

app.put('/products/:id', function (req, res) {
  Product.findOneAndUpdate({ _id: req.params.id }, { $set: { title: req.body.title, price: req.body.price, image: req.body.image } }, { runValidators: true }, function (err) {
    if (err) {
      console.log(err);
      return res.json({ status: false, error: err });
    }
    else {
      res.json({ status: true });
    }
  });
})

app.delete("/products/:id/", function (req, res) {
  Product.remove({ _id: req.params.id }, function (err) {
    if (err) {
      console.log("ERROR: ", err);
      return res.json({ message: "Error", error: err });
    }
    else {
      return res.json({ message: "Success" })
    }
  });
})

