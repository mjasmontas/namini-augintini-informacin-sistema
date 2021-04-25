const mongoose = require("mongoose");

const prescriptionsSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true
  },
  file: {
    type: String
  },
  comment: {
    type: String,
    trim: true
  }
});

const doctorVisitSchema = new mongoose.Schema({
  date: {
    type: Date
  },
  docName: {
    type: String,
    trim: true
  },
  hospital: {
    type: String
  }
});

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
  birthday: {
    type: Date
  },
  prescriptions: [prescriptionsSchema],
  allergies: { type: Array },
  temperament: {
    type: String,
    trim: true
  },
  size: {
    type: String,
    required: true
  },
  docVisits: [doctorVisitSchema],
  image: {
    type: String
  },
  veterinarianVisit: {
    type: Boolean
  },
  veterinarianNote: {
    type: String
  },
  trainerVisit: {
    type: Boolean
  },
  trainerNote: {
    type: String
  },
});

const Pet = mongoose.model("Pet", petSchema);

module.exports = Pet;
