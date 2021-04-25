const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reservationSchema = new mongoose.Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    // required: true,
  },
  // ownerFirstName: {
  //   type: String
  // },
  // ownerLastName: {
  //   type: String
  // },
  pet: {
    type: Schema.Types.ObjectId,
    ref: 'pet',
    // required: true,
  },
  petName: {
    type: String
  },
  startDate: {
    type: Date,
    // required: true,
  },
  endDate: {
    type: Date,
    // required: true,
  },
  clientNotes: {
    type: String,
    maxlength: 20000,
  },
  status: {
    type: String,
    // required: true,
    enum: [
      "uzsakytas",
      "progrese",
      "atsauktas",
      "pabaigtas"
    ],
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
  price: {
    type: Number,
  }
});

const Reservation = mongoose.model("Reservation", reservationSchema);

module.exports = Reservation;
