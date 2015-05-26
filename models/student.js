var mongoose = require('mongoose');
var Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var Students = new Schema({
  studentId: ObjectId,
  name: String,
  gender: String,
  dob: Date,
  school: String,
  level: String,
  country: String,
  satScore: String,
  college: Array
});
console.log('Registering model student');
module.exports = mongoose.model('Students', Students);