// Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
// Seed data for "database"
var friends = require('./app/data/friends.js');

var app = express();
var PORT = process.env.PORT || 8080;

// Static files
app.use(express.static('app/public'));

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// Routes
require('./app/routing/apiRoutes.js')(app);
require('./app/routing/htmlRoutes.js')(app);

//Listener
app.listen(PORT, function () {
  console.log("Listening... on port " + PORT);
});
