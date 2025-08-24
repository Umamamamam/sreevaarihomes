// models/Property.js
const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  propertyType: { type: String, required: true },
  propertyAddress: { type: String, required: true },
  propertyDescription: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("Property", propertySchema);
