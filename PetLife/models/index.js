'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./User");
db.role = require("./userRole");

db.ROLES = ["user", "admin", "petTrainer", "veterinarian"];

module.exports = db;
