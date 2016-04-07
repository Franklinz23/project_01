var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/project_01");

module.exports.Teacher = require("./teacher.js");
module.exports.Donor = require("./donor.js");
