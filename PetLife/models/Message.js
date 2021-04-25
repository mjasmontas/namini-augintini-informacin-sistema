const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  subject: {
    type: String
  },
  message: {
    type: String
  }
});

const Message = mongoose.model("Message", MessageSchema);

module.exports = Message;
