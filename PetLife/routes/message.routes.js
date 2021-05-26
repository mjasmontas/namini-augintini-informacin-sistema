const { authJwt } = require("../customMiddleware");
const controller = require("../controllers/message.controller");
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
    "/api/admin/messages",
    [authJwt.verifyToken, isAdmin], 
    controller.getAllMessages
  );

  app.get(
    "/api/admin/message/:id",
    [authJwt.verifyToken, isAdmin], 
    controller.getMessage
  );

  app.post(
    "/api/message",
    controller.CreateMessage
  );

  app.delete(
    "/api/message/:id",
    [authJwt.verifyToken], 
    controller.deleteMessage      
  )

}