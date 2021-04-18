const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reservationSchema = new mongoose.Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    // required: true,
  },
  pet: {
    type: Schema.Types.ObjectId,
    ref: 'pet',
    // required: true,
  },
  petName: {
    type: String
  },
  arrivalData: {
    type: Date,
    // required: true,
  },
  departureData: {
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
  price: {
    type: Number,
  }
});

const Reservation = mongoose.model("Reservation", reservationSchema);

module.exports = Reservation;
