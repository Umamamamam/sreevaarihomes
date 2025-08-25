const mongoose = require('mongoose');

const partnerFormSchema = new mongoose.Schema({
  // Section 1: Personal & Business Details
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
  city: {
    type: String,
    trim: true
  },
  company: {
    type: String,
    trim: true
  },

  // Section 2: Areas of Interest
  areas: {
    type: [String], 
    enum: [
      'Lead Generation',
      'Property Sales',
      'Referrals',
      'Marketing Support',
      'Exclusive Tie-up'
    ]
  },
  model: {
    type: String,
    enum: [
      'Commission-based',
      'Profit-sharing',
      'Exclusive Territory Rights',
      'Referral Incentives',
      'Other',
      ''
    ],
    default: ''
  },

  // Section 3: Notes (optional)
  notes: {
    type: String,
    trim: true
  },

  // Section 4: Declaration
  declarant: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: Date,
    required: true
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

const PartnerForm = mongoose.model('PartnerForm', partnerFormSchema);

module.exports = PartnerForm;
