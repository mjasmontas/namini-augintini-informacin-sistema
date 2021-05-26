const { authJwt } = require("../customMiddleware");
const controller = require("../controllers/reservation.controller");
const { isAdmin } = require("../customMiddleware/authware");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/admin/reservations",
    [authJwt.verifyToken, isAdmin], 
    controller.getAllReservations
  );

  app.get(
    "/api/admin/reservation/:id",
    [authJwt.verifyToken, isAdmin], 
    controller.getUserReservation
  );

  app.put(
    "/api/admin/reservation/:id",
    controller.updateReservation
  );

  app.get(
    "/api/reservation/:id",
    [authJwt.verifyToken], 
    controller.getReservation
  );

  app.post(
    "/api/user/:id/createReservation",
    controller.createReservation
  );
  
  app.delete(
    "/api/reservation/:id",
    [authJwt.verifyToken], 
    controller.deleteReservation
  );
}