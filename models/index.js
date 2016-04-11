var mongoose = require("mongoose");
mongoose.connect( process.env.MONGOLAB_URI ||
                  process.env.MONGOHQ_URL ||
                  "mongodb://localhost/project_01" );

module.exports.Teacher = require("./teacher.js");
module.exports.Donor = require("./donor.js");
