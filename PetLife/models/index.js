'use strict';


// function Models (mongoose) {
//     const User = require("./Users");
//     const Pet = require("./Pets");
// }

// module.exports = Models;

// module.exports = {
//     Pet: require('./Pets')
// }

// module.exports = {
//     User: require("./User"),
//     Pet: require("./Pets"),
//     PetSitterMod: require("./PetSitterMod"),
//     Reservation: require("./Reservation"),
//     VeterinarianVisits: require("./VeterinarianVisits"),
//     VeterinarianVisits: require("./petTrainerVisit"),
//     Message: require("./Message")
// };

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./User");
db.role = require("./userRole");

db.ROLES = ["user", "admin", "petTrainer", "veterinarian"];

module.exports = db;
