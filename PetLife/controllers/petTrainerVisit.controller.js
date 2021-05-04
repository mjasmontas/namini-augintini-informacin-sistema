const petTrainerVisit = require("../models/petTrainerVisit");
const User = require("../models/User");

exports.getAllpetTrainerVisits = (req, res) => {
    petTrainerVisit.find({})
      .then(function(found) {
        res.json(found);
      })
      .catch(function(err) {
        res.status(500).json(err);
      });
}

exports.createPetTrainerVisit = (req, res) => {
    petTrainerVisit.create(req.body)
    .then(function(petTrainerVisits) {
        return User.findByIdAndUpdate(
          req.params.id,
          { $push: { trainerVisits: petTrainerVisits._id } },
          { new: true }
        );
      })
      .then(() => {
        res.json({ message: "Visit created" });
      })
      .catch(function(err) {
        console.log(err);
      });
}

exports.deletepetTrainerVisit = (req, res) => {
    petTrainerVisit.deleteOne(
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
