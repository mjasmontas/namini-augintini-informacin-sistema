const { authJwt } = require("../customMiddleware");
const controller = require("../controllers/petTrainerVisit.controller");
const { isPetTrainer } = require("../customMiddleware/authware");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/trainerVisits",
    [authJwt.verifyToken, isPetTrainer], 
    controller.getAllpetTrainerVisits
  );

  app.post(
    "/api/user/:id/trainerVisit",
    controller.createPetTrainerVisit
  );

  app.delete(
    "/api/trainerVisit/:id",
    [authJwt.verifyToken, isPetTrainer], 
    controller.deletepetTrainerVisit    
  )

}