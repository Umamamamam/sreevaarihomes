// models/ViewSecond.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ViewSecondSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  phoneNumber: {  // Changed from 'mobile' to match your form
    type: String,
    required: true
  }
});

module.exports = mongoose.model('ViewSecond', ViewSecondSchema);n