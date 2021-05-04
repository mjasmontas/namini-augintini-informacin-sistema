const Pet = require("../models/Pets");
const User = require("../models/User");

exports.getAllPets = (req, res) => {
    Pet.find({})
      .then(function(found) {
        res.json(found);
      })
      .catch(function(err) {
        console.log("There are no pets")
        res.status(500).json(err);
      });
}

exports.getPet = (req, res) => {
    console.log(req.params)
    Pet.findById(req.params.id)
      .then(function(found) {
        res.json(found);
      })
      .catch(function(err) {
        console.log("There are no pets")
        res.status(500).json(err);
      });
}

exports.createPet = (req, res) => {
    Pet.create(req.body)
    .then(function(pet) {
        return User.findByIdAndUpdate(
          req.params.id,
          { $push: { pets: pet._id } },
          { new: true }
        );
      })
      .then(() => {
        res.json({ message: "Pet created" });
      })
      .catch(function(err) {
        console.log(err);
      });
}

exports.deletePet = (req, res) => {
    Pet.deleteOne(
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

exports.updatePet = (req, res) => {
  console.log(req.params.id)
    Pet.findByIdAndUpdate(
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