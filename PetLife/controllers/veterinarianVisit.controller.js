const VeterinarianVisit = require("../models/VeterinarianVisits");
const User = require("../models/User");

exports.getAllVeterinarianVisit = (req, res) => {
    VeterinarianVisit.find({})
      .then(function(found) {
        res.json(found);
      })
      .catch(function(err) {
        res.status(500).json(err);
      });
}

exports.createVeterinarianVisit = (req, res) => {
    VeterinarianVisit.create(req.body)
    .then(function(veterinarianVisits) {
        return User.findByIdAndUpdate(
          req.params.id,
          { $push: { veterinarianVisits: veterinarianVisits._id } },
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

exports.deleteVeterinarianVisit = (req, res) => {
    VeterinarianVisit.deleteOne(
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
