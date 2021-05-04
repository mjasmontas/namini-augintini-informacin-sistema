const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const petTrainerSchema = new mongoose.Schema({
  petOwnerName: {
    type: String
  },
  petOwnerPhoneNumber: {
    type: Number
  },
  petName: {
    type: String
  },
  petType: {
    type: String
  },
  petSize: {
    type: String
  },
  trainersNote: {
    type: String,
    maxlength: 2000,
  },
  startDate: {
      type: Date
  }
});

const PetTrainerVisits = mongoose.model("PetTrainerVisits", petTrainerSchema);

module.exports = PetTrainerVisits;
