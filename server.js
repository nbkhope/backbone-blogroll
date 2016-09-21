// Import modules
var express = require('express');
var mongoose = require('mongoose');

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

// Server port
var PORT = 8080;

app.listen(PORT);
console.log("Server has been initiated at port " + PORT);
