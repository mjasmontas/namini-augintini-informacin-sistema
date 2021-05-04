const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    index: {
      unique: true
    }
  },
  phoneNumber: { 
    type: String, 
    maxlength: 24 
  },
  password: String,
  pets: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pet"
    }
  ],
  petSitters: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PetSitter"
    }
  ],
  reservation: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reservation"
    }
  ],
  veterinarianVisits: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "VeterinarianVisits"
    }
  ],
  trainerVisits: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PetTrainerVisits"
    }
  ],
  roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role"
    }
  ]
});

module.exports = mongoose.model("User", UserSchema);
