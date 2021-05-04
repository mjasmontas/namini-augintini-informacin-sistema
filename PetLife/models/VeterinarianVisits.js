const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const veterinarianSchema = new mongoose.Schema({
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
  veterinarianNotes: {
    type: String,
    maxlength: 2000,
  },
  startDate: {
      type: Date
  }
});

const VeterinarianVisits = mongoose.model("VeterinarianVisits", veterinarianSchema);

module.exports = VeterinarianVisits;
