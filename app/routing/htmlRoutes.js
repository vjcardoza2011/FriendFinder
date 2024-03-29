// Dependencies 
var path = require('path');

// Routes
module.exports = function (app) {
  // A default, catch-all route that leads to `home.html` which displays the home page.
  app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/../public/home.html'));
  });
  // A GET Route to `/survey` that displays the survey page.
  app.get('/survey', function (req, res) {
    res.sendFile(path.join(__dirname, '/../public/survey.html'));
  });

  // If no matching route is found, default to home
  app.use(function (req, res) {
    res.sendFile(path.join(__dirname + '/../public/home.html'));
  });
};