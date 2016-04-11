
// SERVER-SIDE JAVASCRIPT

//require express in our app
var express = require('express');
// generate a new express app and call it 'app'
var app = express();

//connect to models
var database = require('./models');

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

//use body parser
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


/**********
 * ROUTES *
 **********/

/*
 * --------------HTML Endpoints----------------
 */

 app.get('/', function homepage (req, res) {
   res.sendFile(__dirname + '/views/index.html');
 });

 /*
  * ------------API Endpoints ------------------
  */

//**GET ALL teachers**
app.get('/api/teachers', function (req, res) {

  database.Teacher.find(
    function(err, teachers){
      if (err) {
        return console.log("cant find em", err);
      }
      res.json(teachers);
    });

});

//**GET ONE teacher**
app.get('/api/teachers/:id', function(req, res) {

  database.Teacher.findById(req.params.id, function(err, foundTeacher) {
      if(err) {
        console.log('cant find em', err);
      }
      console.log('found em', foundTeacher);
      res.json(foundTeacher);
  });
});


//**POST a teacher
app.post('/api/teachers', function (req, res) {
  console.log("im posting");
  console.log(req.body);

  var newPost = req.body;

  database.Teacher.create(newPost, function (err, post){
    if(err) {
      console.log("you shall not post", err);
    }

    console.log(post);
    res.json(post);
  });

});

//DELETE a teacher
app.delete('/api/teachers/:id', function (req, res) {

  database.Teacher.findOneAndRemove({ _id: req.params.id }, function(err, foundPost) {
    if(err) {
      console.log("dont let me go", err);
    }

    res.json(foundPost);

  });
});

//UPDATE a teacher

app.put('/api/teachers/:id', function (req, res) {
 console.log('updating post', req.body);
 database.Teacher.findById(req.params.id, function(err, foundPost) {
   if (err) {
     console.log('PUT aka update server error', err);
   }
   foundPost.name = req.body.name;
   foundPost.schoolName = req.body.schoolName;
   foundPost.location = req.body.location;
   foundPost.needs = req.body.needs;
   foundPost.deadline = req.body.deadline;
   foundPost.description = req.body.description;
   foundPost.save(function(err, savedPost) {
     if (err) {
       console.log('saving updates failed');
     }
     res.json(savedPost);
   });
 });

});






/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});
