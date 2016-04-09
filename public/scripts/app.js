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

  //DELETE post
  $('#leaders').on('click', '#deleteButton', function() {
    console.log($(this).attr('data-id'));
    var youSure = confirm("Are you sure you want to delete your post?");

    if(youSure) {
      $.ajax({
        method: 'DELETE',
        url: '/api/teachers/'+$('.teacher').attr('data-id'),
        success: deleteSuccess,
        error:  deleteError
      });
    }

  });

  $('#leaders').on('click', '#mihButton', function() {
    console.log("you made it happen bro");
    
  });




});

//Slap it on the page
function renderTeacher(teachers) {
  console.log('adding fake teachers', teachers);

  var teacherHTML = template({teacher: teachers});

  $('#leaders').prepend(teacherHTML);

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

// NEW POST HANDLERS
function newTeacherPost(newPost) {
  console.log("submitted: ", newPost);
  renderTeacher(newPost);
}

function errorTeacherPost(err) {
  console.log("you shall not post", err);
}

//DELETE HANDLERS

function deleteSuccess(json) {
  console.log(json);
  $('#onePost').remove();
  $('#onePost').prepend("<h3>Your Post has been DELETED</h3>");


}

function deleteError(err) {
  console.log('why you wanna go and do that?', err);
}
