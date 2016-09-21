// Import modules
var express = require('express');

// Make the app
var app = express();

// Set up simple static server at /public
app.use(express.static(__dirname + '/public'));

// Server port
var PORT = 8080;

app.listen(PORT);
console.log("Server has been initiated at port " + PORT);
