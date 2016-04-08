var database = require('./models');

var teacherList = [];

  teacherList.push({
    name: 'Rick',
    schoolName: 'Jefferson Elementary',
    location: 'Oakland CA',
    needs: '25 small whiteboards',
    deadline: 'June 5th 2016',
    description: 'Trying to teach everyone to pseudo code'
  });

  teacherList.push({
    name: 'Carl',
    schoolName: 'O Highschool',
    location: 'San Francisco CA',
    needs: 'lots of pencils',
    deadline: 'April 20th 2016',
    description: 'drawing a masterpiece'
  });

  teacherList.push({
    name: 'Mishone',
    schoolName: 'Art of the Swords',
    location: 'San Jose CA',
    needs: 'Zombies',
    deadline: 'July 4th 2016',
    description: 'need bait'
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
