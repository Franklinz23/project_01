//CLIENT-SIDE JS

$(document).ready(function() {
  console.log('app.js loaded!');


  //Get all teachers
  $.ajax({
    method: "GET",
    url: "api/teachers",
    success: onSuccess,
    error: onError
  });

  $('#singleButton').on('submit', function (e){
    e.preventDefault();
    console.log("submitted");

  });




});

// function renderTeacher(teacher) {
//   console.log('adding fake teachers', teacher);
//
//   var teacherHTML = template({});
//
//
// }

function onSuccess(json) {
  console.log("YAY!");
  console.log(json);
}

function onError(err) {
  console.log("FUCK!");
  console.log(err);
}
