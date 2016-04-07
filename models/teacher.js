var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TeacherSchema = new Schema({
  name: String,
  schoolName: String,
  location: String,
  needs: String,
  deadline: String,
  description: String,
  donor: [Donor.schema]
});

var Teacher = mongoose.model('Teacher', TeacherSchema);

module.exports = Teacher;
