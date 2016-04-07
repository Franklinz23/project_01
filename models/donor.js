var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var DonorSchema = new Schema({
  name: String,
  comment: String
});

var Donor = mongoose.model('Donor', DonorSchema);

module.exports = Donor;
