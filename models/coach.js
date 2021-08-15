const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const CoachSchema = new Schema({
  id: ObjectId,
  fullName: String,
  email: String,
  profilePictureUrl: String,
  country: String,
  experiences: Array,
  isPGecomStaff: Boolean,
  contactOnSlack: String,
  createdWith: String,
  hubspotCalendarUrl: String,
});

const CoachModel = mongoose.model('coach', CoachSchema);


module.exports = CoachModel;