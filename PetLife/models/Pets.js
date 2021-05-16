const mongoose = require("mongoose");

const petSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String
  },
  type: {
    type: String,
    required: true,
  },
  years: {
    type: Number
  },
  allergies: { type: Array },
  temperament: {
    type: String,
    trim: true
  },
  size: {
    type: String,
    required: true
  }
});

const Pet = mongoose.model("Pet", petSchema);

module.exports = Pet;
