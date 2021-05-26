const Reservation = require("../models/Reservation");
const User = require("../models/User");

exports.getAllReservations = (req, res) => {
    Reservation.find({}).sort({ createdAt: 'desc'})
      .then(function(found) {
        res.json(found);
      })
      .catch(function(err) {
        res.status(500).json(err);
      });
}

exports.getReservation = (req, res) => {
    Reservation.findById(req.params.id)
      .then(function(found) {
        res.json(found);
      })
      .catch(function(err) {
        res.status(500).json(err);
      });
}

exports.getUserReservation = (req, res) => {
  Reservation.findById(req.params.id)
    .then(function(found) {
      res.json(found);
    })
    .catch(function(err) {
      res.status(500).json(err);
    });
}

exports.updateReservation = (req, res) => {
  Reservation.findByIdAndUpdate(
    req.params.id,
    {$set: {status: req.body.status}}, 
    function(err, updated) {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        console.log("else: " + updated);
        res.send(updated);
      }
    }
  )
}

exports.createReservation = (req, res) => {
    Reservation.create(req.body)
    .then(function(reservation) {
        return User.findByIdAndUpdate(
          req.params.id,
          { $push: { reservation: reservation._id } },
          { new: true }
        );
      })
      .then(() => {
        res.json({ message: "Reservation created" });
      })
      .catch(function(err) {
        console.log(err);
      });
}

exports.deleteReservation = (req, res) => {
    Reservation.deleteOne(
        {
          _id: req.params.id
        },
        function(err, removed) {
          if (err) {
            console.log(err);
            res.send(err);
          } else {
            console.log(removed);
            res.send(removed);
          }
        }
      );
}

exports.updateReservation = (req, res) => {
    Reservation.findByIdAndUpdate(
        req.params.id,
        {$set: req.body},
      function(err, updated) {
        if (err) {
          console.log(err);
          res.send(err);
        } else {
          res.send(updated);
        }
      }
    );
}