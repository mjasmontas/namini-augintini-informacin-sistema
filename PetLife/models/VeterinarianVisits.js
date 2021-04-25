const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const veterinarianSchema = new mongoose.Schema({
  veterinarianId: {
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
  veterinarianNotes: {
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

const VeterinarianVisits = mongoose.model("VeterinarianVisits", veterinarianSchema);

module.exports = VeterinarianVisits;
