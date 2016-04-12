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
    url: "/api/teachers",
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
    var teacherId = $(this).parents('.teacher').data('id');
    console.log('someone wants to delete id=' + teacherId );

    var youSure = confirm("Are you sure you want to delete your post?");

    if(youSure) {
      $.ajax({
        method: 'DELETE',
        url: '/api/teachers/'+ teacherId,
        success: deleteSuccess,
        error:  deleteError
      });
    }

  });

  // when the Make it happen (mih) button is clicked, display the modal
  $('#leaders').on('click', '#mihButton', function() {
    var currentPostID = $(this).closest('.teacher').data('id');
    console.log(currentPostID);
    $('#donorModal').data('id:', currentPostID);
    $('#donorModal').modal();  // display the modal!
    console.log("youre making it happen bro");
  });


  //PUT aka UPDATE a teacher POST
  $('#leaders').on('click', '#updateButton', updatePost);
  $('#leaders').on('click', '#savedUpdateButton', saveUpdatedPost);


  //when donor clicks the DONATE button
  $('#donateButton').on('click', handleNewDonor);





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

function deleteSuccess(data) {
  console.log(data._id);
  var id = data._id;
  console.log('delete' + ':' + id);
  $('#onePost[data-id=' + id + ']').remove();
  $('#onePost').prepend("<h3>Your Post has been DELETED</h3>");

}


function deleteError(err) {
  console.log('why you wanna go and do that?', err);
}

//UPDATE aka PUT HANDLERS
function updatePost(e) {
  var $postRow = $(this).closest('.teacher');
  var postID = $postRow.data('id');
  console.log('edit post: ', postID);

  //this will show the "save changes" button
  $postRow.find('#savedUpdateButton').toggleClass('hidden');
  //hide "update" button
  $postRow.find('#updateButton').toggleClass('hidden');

  //this will find the current input field, and replace it with
  //new input field including new class name
  var teacherName = $postRow.find('span.name').text();
  $postRow.find('span.name').html('<input class="edit-name" value="' + teacherName + '"></input>');

  var schoolName = $postRow.find('span.school-name').text();
  $postRow.find('span.school-name').html('<input class="edit-school-name" value="' + schoolName + '"></input>');

  var location = $postRow.find('span.location').text();
  $postRow.find('span.location').html('<input class="edit-location" value="' + location + '"></input>');

  var needs = $postRow.find('span.needs').text();
  $postRow.find('span.needs').html('<input class="edit-needs" value="' + needs + '"></input>');

  var deadline = $postRow.find('span.deadline').text();
  $postRow.find('span.deadline').html('<input class="edit-deadline" value="' + deadline + '"></input>');

  var description = $postRow.find('span.description').text();
  $postRow.find('span.description').html('<input class="edit-description" value="' + description + '"></input>');
}


//AJAX call with PUT is in here
function saveUpdatedPost(e) {
  var postID = $(this).parents('.teacher').data('id');
  var $postRow = $('[data-id=' + postID +']');

  var data = {
    name: $postRow.find('.edit-name').val(),
    schoolName: $postRow.find('.edit-school-name').val(),
    location: $postRow.find('.edit-location').val(),
    needs: $postRow.find('.edit-needs').val(),
    deadline: $postRow.find('.edit-deadline').val(),
    description: $postRow.find('.edit-description').val()
  };
  console.log('Update data for post', postID, 'with new data', data);

  $.ajax({
    method: 'PUT',
    url: '/api/teachers/' + postID,
    data: data,
    success: handlePostUpdate
  });

}

function handlePostUpdate(data) {
  console.log('response', data);

  var postID = data._id;

  //remove post from page
  $('[data-id=' + postID + ']').remove();

  //re-render
  renderTeacher(data);
}




//NEW DONOR HANDLERS

function handleNewDonor(e) {
  e.preventDefault();

  var $donorName = $('#donorName').val();
  var $donorContact = $('#contact').val();
  var currentPostID = $('#onePost').data('id');
  //$('#donorModal').data('id');
  console.log("saved new donor on post id:", currentPostID);

  var donor = {
    name: $donorName,
    contact: $donorContact
  };

  console.log('Got a donor:', donor.name, 'and his contact:', donor.contact);

  $.ajax({
    method: 'POST',
    url: '/api/teachers/' + currentPostID + '/donors',
    data: donor,
    success: newDonorSuccess
  });

}

function newDonorSuccess(newDonor) {
  console.log("heres the new guy", newDonor);
  $('#donorModal').modal('hide');
  renderTeacher();

}
