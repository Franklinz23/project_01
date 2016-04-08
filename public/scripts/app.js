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
    $.ajax({
      method: 'POST',
      url: '/api/teachers',
      data: $(this).serialize(),
      success: newTeacherPost,
      error: console.log("you shall not post")

    });

  });




});

// function renderTeacher(teacher) {
//   console.log('adding fake teachers', teacher);
//
//   var teacherHTML = template({});
//
//
// }

function newTeacherPost(newPost){
  console.log("submitted: ", newPost);
}

function onSuccess(json) {
  console.log("YAY!");
  console.log(json);
}

function onError(err) {
  console.log("FUCK!");
  console.log(err);
}
