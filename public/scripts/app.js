//CLIENT-SIDE JS

var template;

$(document).ready(function() {
  console.log('app.js loaded!');

  //HANDLEBAR STUFFFF
  var source = $('#leader-template').html();
  template = Handlebars.compile(source);


  //GET all teachers
  $.ajax({
    method: "GET",
    url: "api/teachers",
    success: onSuccess,
    error: onError
  });

  //POST when form is submitted
  $('#mih-form').on('submit', function(e) {
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/api/teachers',
      data: $(this).serialize(),
      success: newTeacherPost,
      error: errorTeacherPost

    });

  });




});

function renderTeacher(teachers) {
  console.log('adding fake teachers', teachers);

  var teacherHTML = template({teacher: teachers});

  $('#leaders').prepend(teacherHTML);

}

// NEW POST HANDLERS
function newTeacherPost(newPost) {
  console.log("submitted: ", newPost);
  renderTeacher(newPost);
}

function errorTeacherPost(err) {
  console.log("you shall not post", err);
}

// GET ALL TEACHERS HANDLERS
function onSuccess(json) {
  console.log("YAY!");
  console.log(json);
  json.forEach(function(post) {
    renderTeacher(post);
  });
}

function onError(err) {
  console.log("FUCK!");
  console.log(err);
}
