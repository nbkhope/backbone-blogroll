// Import modules
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// Make the app
var app = express();

// Connect to the Mongo DB
mongoose.connect('mongodb://localhost/backboneblogroll');

// Create DB Schema
var Schema = mongoose.Schema;
var BlogSchema = new Schema({
  author: String,
  title: String,
  url: String
});

// Create model based on the Schema given
mongoose.model('Blog', BlogSchema);
var Blog = mongoose.model('Blog');

// add new entry to the db
var myBlog = new Blog({
  author: 'Marty Cat',
  title: 'Marty\'s Cat Blog',
  url: 'http://www.github.com/'
});

myBlog.save();

// Set up simple static server at /public
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());

// API Endpoints
app.get('/api/blogs', function(req, res) {
  Blog.find(function(err, docs) {
    docs.forEach(function(item) {
      console.log('Received GET for', item);
    });
    res.send(docs);
  });
});

app.post('/api/blogs', function(req, res) {
  var blog = new Blog(req.body); // need bodyParser for req.body

  console.log("Received a POST request");
  for (var key in req.body) {
    console.log(key + ': ' + req.body[key]);
  }

  blog.save(function(err, doc) {
    res.send(doc);
  });
});

// Server port
var PORT = 8080;

app.listen(PORT);
console.log("Server has been initiated at port " + PORT);
