const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    match: /^[0-9]{10}$/   
  },
  email: {
    type: String,
    trim: true
  },
  agree: {
    type: Boolean,
    default: true
  },
  loan: {
    type: Boolean,
    default: false
  },
  projectName: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("CityProperty", ContactSchema);
