const { authJwt } = require("../customMiddleware");
const controller = require("../controllers/pets.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/pets",
    [authJwt.verifyToken], 
    controller.getAllPets
  );

  app.get(
    "/api/pet/:id",
    [authJwt.verifyToken], 
    controller.getPet
  );

  app.post(
    "/api/user/:id/createPet",
    controller.createPet
  );

  app.delete(
    "/api/pet/:id",
    [authJwt.verifyToken], 
    controller.deletePet
  );

  app.put(
    "/api/pet/:id", 
    controller.updatePet
  );
}