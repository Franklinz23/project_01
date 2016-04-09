var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var DonorSchema = new Schema({
  name: String,
  contact: String
});

var Donor = mongoose.model('Donor', DonorSchema);

module.exports = Donor;
