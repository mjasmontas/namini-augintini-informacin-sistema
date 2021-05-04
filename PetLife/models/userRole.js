const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roleSchema = new Schema({

  roleName: {
    type: String
  },
  roleLabel: {
    type: String
  }
});

const Role = mongoose.model('Role', roleSchema);

module.exports = Role;
