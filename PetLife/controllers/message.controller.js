const Message = require("../models/Message");

exports.getAllMessages = (req, res) => {
    Message.find({})
      .then(function(found) {
        res.json(found);
      })
      .catch(function(err) {
        console.log("There are no messages")
        res.status(500).json(err);
      });
}

exports.getMessage = (req, res) => {
  Message.findById(req.params.id)
  .then(function(found) {
    res.json(found);
  })
  .catch(function(err) {
    console.log("Message does not exist")
    res.status(500).json(err);
  });
}

exports.deleteMessage = (req, res) => {
    Message.deleteOne(
        {
          _id: req.params.id
        },
        function(err, removed) {
          if (err) {
            console.log(err);
            res.send(err);
          } else {
            res.send(removed);
          }
        }
    );
}


exports.CreateMessage = (req, res) => {
  Message.create(req.body)
    .then(() => {
      res.json({ message: "Message created" });
    })
    .catch(function(err) {
      console.log(err);
    });
}