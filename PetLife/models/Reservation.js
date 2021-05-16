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
  },
  petName: {
    type: String
  },
  startDate: {
    type: Date
  },
  endDate: {
    type: Date
  },
  clientNotes: {
    type: String,
    maxlength: 20000,
  },
  status: {
    type: String,
  },
    price: {
    type: Number,
  }
});

const Reservation = mongoose.model("Reservation", reservationSchema);

module.exports = Reservation;
