var friends = require('../data/friends.js');

module.exports = function (app) {
  // api path to get the friends data
  app.get('/api/friends', function (req, res) {
    res.json(friends);
  });

  // updates an array of friends "database" array and sends back the json form of the most compatible new friend
  app.post('/api/friends', function (req, res) {

    var newFriend = req.body;

    // compute best match from answers
    var bestMatch = {};

    for (var i = 0; i < newFriend.answers.length; i++) {
      if (newFriend.answers[i] == "1 (Strongly Disagree)") {
        newFriend.answers[i] = 1;
      } else if (newFriend.answers[i] == "5 (Strongly Agree)") {
        newFriend.answers[i] = 5;
      } else {
        newFriend.answers[i] = parseInt(newFriend.answers[i]);
      }
    }


    var bestMatchIndex = 0;
    //greatest score difference for a question is 4, therefore greatest difference is 4 times # of questions in survey
    var bestMatchDifference = 40;

    for (var i = 0; i < friends.length; i++) {
      var totalDifference = 0;

      for (var index = 0; index < friends[i].answers.length; index++) {
        var differenceOneScore = Math.abs(friends[i].answers[index] - newFriend.answers[index]);
        totalDifference += differenceOneScore;
      }

      // if the totalDifference in answers is less than the best match so far
      // save that index and difference
      if (totalDifference < bestMatchDifference) {
        bestMatchIndex = i;
        bestMatchDifference = totalDifference;
      }
    }

    // the best match index is used to get the best match data from the friends index
    bestMatch = friends[bestMatchIndex];

    // Push new friend from survey in "database" array
    friends.push(newFriend);

    // return the best match friend
    res.json(bestMatch);
  });

};