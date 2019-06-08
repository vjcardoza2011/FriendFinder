// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var fs = require("fs");

// Setting up connection to express
var app = express();
var PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Static files
app.use(express.static("app/public"));

// Router
require("./app/routing/apiRoutes.js")(app, path);
require("./app/routing/htmlRoutes.js")(app, path);

app.listen(PORT, function() {
  console.log("Listening... on port " + PORT);
});
