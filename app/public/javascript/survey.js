function surveyQuestions() {
  let q1 = "I enjoy long walks on the beach.";
  let q2 = "I enjoy risky adventures.";
  let q3 = "I am enthusiatic.";
  let q4 = "I have a bad temper.";
  let q5 = "I enjoy going to the gym.";
  let q6 = "I am an extrovert.";
  let q7 = "I am an introvert.";
  let q8 = "I like dogs.";
  let q9 = "I like cats.";
  let q10 = "I enjoy traveling.";
  let questionArray = [q1, q2, q3, q4, q5, q6, q7, q8, q9, q10];
  return questionArray;
}

var questions = surveyQuestions();

$("#questionDiv").append('<div class="row"><div class="col-lg-12" id="title-survey">');
for (var i = 0; i < questions.length; i++) {
  $("#questionDiv").append('<h3>Question ' + (i + 1) + '</h3>' + '<p>' + questions[i] + '</p>' + '<select class="chosen-select dropList" id="q' + i + '">' + '<option value=""></option>' + '<option value="1">1 (Strongly Disagree)</option>' + '<option value="2">2</option>' + '<option value="3">3</option>' + '<option value="4">4</option>' + '<option value="5">5 (Strongly Agree)</option>' + '</select>');
}

$("#questionDiv").append('<button type="submit" class="btn btn-primary" id="submitButton">Submit</button>' + '</div></div>');

// Setup for Chosen dropdown
var config = {
  ".chosen-select": {},
  ".chosen-select-deselect": {
    allow_single_deselect: true
  },
  ".chosen-select-no-single": {
    disable_search_threshold: 10
  },
  ".chosen-select-no-results": {
    no_results_text: "Oops, nothing found!"
  },
  ".chosen-select-width": {
    width: "95%"
  }
};


for (var selector in config) {
  $(selector).chosen(config[selector]);
}

// On click function for submit button
$("#submitButton").on("click", function (event) {
  // Don't reload the page
  event.preventDefault();
  // Make sure all form elements were selected
  function userValidation() {
    // Start with correct validation
    let valid = true;
    if ($("#name").val() === "") {
      valid = false;
    }
    if ($("#image").val() === "") {
      valid = false;
    }
    // Check if yourImg begins with "http://" or "https://"
    if ($("#image").val().charAt(4) !== ":" && $("#image").val().charAt(5) !== ":") {
      // If yourImg isn't "http://" or "https://", validation is incorrect
      valid = false;
    }
    // Check dropdown boxes for empty values (top values are always empty)
    $(".chosen-select").each(function () {
      if ($(this).val() === "") {
        // If a valid option has not been selected, validation is incorrect
        valid = false;
      }
    });
    // This function will return true if validation is correct, false if not
    return valid;
  }
  // Move forward if validation is correct
  if (userValidation()) {
    // Store the user's answers
    var formAnswers = {
      "name": $("#name").val().trim(),
      "photo": $("#image").val().trim(),
      "answers": [
        parseInt($("#q0").val()),
        parseInt($("#q1").val()),
        parseInt($("#q2").val()),
        parseInt($("#q3").val()),
        parseInt($("#q4").val()),
        parseInt($("#q5").val()),
        parseInt($("#q6").val()),
        parseInt($("#q7").val()),
        parseInt($("#q8").val()),
        parseInt($("#q9").val())
      ]
    };
    // POST to api/friends.
    $.post("/api/friends", formAnswers, function (data) {
      // Update the match modal with the correct name & image
      $("#friendNameDiv").html("<h2>" + data.name + "</h2>");
      $("#friendImg").attr("src", data.photo);
      // Show the match modal
      $("#myModal").modal("toggle");
    });
  }
  // If the user validation failed
  else {
    alert("Oops! Looks like you missed a question");
  }
});