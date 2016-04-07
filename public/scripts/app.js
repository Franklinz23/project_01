//CLIENT-SIDE JS

$(document).ready(function() {

  console.log('app.js loaded!');
  $.ajax({
    method: "GET",
    url: "api/teachers",
    success: sanitySuccess,
    error: sanityError
  });


});



function sanitySuccess(json) {
  console.log("YAY!");
  console.log(json);
}

function sanityError(err) {
  console.log("FUCK!");
  console.log(err);
}
