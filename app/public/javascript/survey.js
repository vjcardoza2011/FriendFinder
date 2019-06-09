// Grab the URL of the website
var currentURL = window.location.origin;
// Capture the form inputs
$("#submit").on("click", function () {
  if (($('#name').val().trim() !== "") && ($('#photo').val().trim() !== "")) {
    // Create an object for the user's data
    var userData = {
      name: $("#name").val(),
      photo: $("#photo").val(),
      answers: [$("#q1").val(), $("#q2").val(), $("#q3").val(), $("#q4").val(), $("#q5").val(), $("#q6").val(), $("#q7").val(), $("#q8").val(), $("#q9").val(), $("#q10").val(),]
    }
    // AJAX post the data to the friends API.
    $.post(currentURL + "/api/friends", userData, function (data) {
      // Grab the result from the AJAX post so that the best match's name and photo are displayed.
      $("#matchName").html(data.name);
      $('#matchImg').attr("src", data.photo);
      // Show the modal with the best match
      $("#resultsModal").modal('toggle');
      // clear the input fields in the form
      $("#name").val("");
      $("#photo").val("");
    });
  } else {
    $(".modal-title").text("Missing required information");
    $(".modal-body").html("<h3>Please complete the form before submitting</h3>");
    $("#resultsModal").modal('toggle');
  }
  return false;
});
// modal logic
$('#closeModal').click(function () {
  $.get('/', function (req, res) {
    location.replace(res);
  })
});