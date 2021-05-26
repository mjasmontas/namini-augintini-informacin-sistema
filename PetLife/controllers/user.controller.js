// const db = require("../models");

// // Defining methods for the userController
// module.exports = {
//     findAll: function (req, res) {
//         db.User
//             .find(req.query)
//             .then(dbModel => res.json(dbModel))
//             .catch(err => res.status(422).json(err));
//     },
//     findById: function (req, res) {
//         db.User
//             .findById(req.params.id)
//             .then(dbModel => res.json(dbModel))
//             .catch(err => res.status(422).json(err));
//     },
//     create: function (req, res) {
//         db.User
//             .create(req.body)
//             .then(dbModel => res.json(dbModel))
//             .catch(err => res.status(422).json(err));
//     },
//     update: function (req, res) {
//         db.User
//             .findOneAndUpdate({ _id: req.params.id }, req.body)
//             .then(dbModel => res.json(dbModel))
//             .catch(err => res.status(422).json(err));
//     },
//     remove: function (req, res) {
//         db.User
//             .findById({ _id: req.params.id })
//             .then(dbModel => dbModel.remove())
//             .then(dbModel => res.json(dbModel))
//             .catch(err => res.status(422).json(err));
//     }
// };

const User = require("../models/User");



exports.getAllUsers = (req, res) => {
    User.find()
    .then(users => res.status(200).json(users))
    .catch(err => res.status(400).json('Error: ' + err));
};

exports.getUser = (req, res) => {
  User.findById(req.params.id)
      .then(function(found) {
        res.json(found);
      })
      .catch(function(err) {
        res.status(500).json(err);
      });
};

exports.getUserPets = (req, res) => {
    User.findById(req.params.id)
      .populate("pets")
      .then(response => res.json(response))
      .catch(function(err) {
        console.log(err);
      });
}

exports.getUserReservations = (req, res) => {
    User.findById(req.params.id)
      .populate("reservation")
      .then(response => res.json(response))
      .catch(function(err) {
        console.log(err);
      });
}

exports.getUserVeterinarianVisits = (req, res) => {
    User.findById(req.params.id)
      .populate("veterinarianVisits")
      .then(response => res.json(response))
      .catch(function(err) {
        console.log(err);
      });
}

exports.getUserTrainerVisits = (req, res) => {
  User.findById(req.params.id)
    .populate("trainerVisits")
    .then(response => res.json(response))
    .catch(function(err) {
      console.log(err);
    });
}

exports.updateUser = (req, res) => {
    User.findByIdAndUpdate(
      req.params.id,
      {$set: {roles: req.body.roles}}, 
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

exports.updateProfileUser = (req, res) => {
  User.findByIdAndUpdate(
    req.params.id,
    {$set: {firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email,phoneNumber: req.body.phoneNumber
      ,years: req.body.years, address: req.body.address, city: req.body.city, zipCode: req.body.zipCode}}, 
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

exports.deleteUser = (req, res) => {
  let id = req.params.id;
  User.deleteOne(
    {
      _id: id
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

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};

exports.petTrainerBoard = (req, res) => {
    res.status(200).send("Pet Trainer Content.");
};

exports.veterinarianBoard = (req, res) => {
    res.status(200).send("Veterinarian Content.");
};