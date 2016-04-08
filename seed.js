var database = require('./models');

var teacherList = [];

  teacherList.push({
    name: 'Rick',
    schoolName: 'Jefferson Elementary',
    location: 'Oakland CA',
    needs: '25 small whiteboards',
    deadline: 'June 5th 2016',
    description: 'Trying to have coding Tuesdays, we need whiteboards!'
  });

  database.Teacher.remove({}, function(err, teachers){

  database.Teacher.create(teacherList, function(err, teachers){
    if (err) {
      return console.log('ERROR', err);
    }

    console.log("all teachers:", teachers);
    process.exit();
  });

});
