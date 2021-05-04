const { authJwt } = require("../customMiddleware");
const controller = require("../controllers/user.controller");
const { isVeterinarian, isPetTrainer } = require("../customMiddleware/authware");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/users",
    [authJwt.verifyToken], 
    controller.getAllUsers
  );

  app.get(
    "/api/user/:id",
    [authJwt.verifyToken], 
    controller.getUser
  );

  app.get(
    "/api/user/:id/petFamily",
    [authJwt.verifyToken], 
    controller.getUserPets
  );

  app.get(
    "/api/user/:id/reservations",
    [authJwt.verifyToken], 
    controller.getUserReservations
  );

  app.get(
    "/api/veterinarian/:id",
    [authJwt.verifyToken, isVeterinarian], 
    controller.getUserVeterinarianVisits
  );

  app.get(
    "/api/trainer/:id",
    [authJwt.verifyToken, isPetTrainer], 
    controller.getUserTrainerVisits
  );

  app.put(
    "/api/admin/user/:id",
    controller.updateUser
  );
  
  app.delete(
    "/api/admin/user/:id",
    [authJwt.verifyToken], 
    controller.deleteUser
  );


  // app.get("/api/test/all", controller.allAccess);

  // app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);

  // app.get(
  //   "/api/test/petTrainer",
  //   [authJwt.verifyToken, authJwt.isPetTrainer],
  //   controller.petTrainerBoard
  // );

  // app.get(
  //   "/api/test/veterinarian",
  //   [authJwt.verifyToken, authJwt.isVeterinarian],
  //   controller.veterinarianBoard
  // );

  // app.get(
  //   "/api/test/admin",
  //   [authJwt.verifyToken, authJwt.isAdmin],
  //   controller.adminBoard
  // );
};