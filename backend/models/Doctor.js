const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  speciality: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  availability: {
    type: String,
    required: true
  },
  experience: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  patients: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Doctor", doctorSchema);