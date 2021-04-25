const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const petTrainerSchema = new mongoose.Schema({
  trainerId: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  petOwner: {
    type: String
  },
  pet: {
    type: Schema.Types.ObjectId,
    ref: 'pet'
  },
  petName: {
    type: String
  },
  trainersNote: {
    type: String,
    maxlength: 2000,
  },
  startDate: {
      type: Date
  },
  endDate: {
      type: Date
  },
  startTime: {
    type: String,
    default: ''
  },
  endTime: {
    type: String,
    default: ''
  }
});

const PetTrainerVisits = mongoose.model("PetTrainerVisits", petTrainerSchema);

module.exports = PetTrainerVisits;
