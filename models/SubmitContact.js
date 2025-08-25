const mongoose = require('mongoose');

const submitContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  bhk: {
    type: String,
    required: true,
    enum: ['2BHK', '3BHK', '4BHK']
  },
  agree: {
    type: Boolean,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const SubmitContact = mongoose.model('SubmitContact', submitContactSchema);
module.exports = SubmitContact;
