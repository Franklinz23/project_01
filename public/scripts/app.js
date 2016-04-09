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

  // when the Make it happen (mih) button is clicked, display the modal
  $('#leaders').on('click', '#mihButton', function() {
    var currentPostID = $(this).closest('.teacher').data('data-id'); // "5665ff1678209c64e51b4e7b"
    console.log(currentPostID);
    $('#donorModal').data('data-id', currentPostID);
    $('#donorModal').modal();  // display the modal!
    console.log("youre making it happen bro");
  });

  // $('#donorModal').on('click', '#donateButton', function(){
  //
  //   $.ajax({
  //     method: 'POST',
  //     url: '/api/teachers/'+   :id/donor'
  //
  //
  //   });
  //
  // });



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
