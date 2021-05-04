const { authJwt } = require("../customMiddleware");
const controller = require("../controllers/veterinarianVisit.controller");
const { isVeterinarian } = require("../customMiddleware/authware");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/veterinarianVisits",
    [authJwt.verifyToken, isVeterinarian], 
    controller.getAllVeterinarianVisit
  );

  app.post(
    "/api/user/:id/veterinarianVisit",
    controller.createVeterinarianVisit
  );

  app.delete(
    "/api/veterinarianVisit/:id",
    [authJwt.verifyToken, isVeterinarian], 
    controller.deleteVeterinarianVisit    
  )

}