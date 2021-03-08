const routes = require("express").Router();
const cinemaController = require("../controllers/cinema");
const authMiddleware = require("../middlewares/auth");
const uploadImage = require("../middlewares/uploadFileCinema");
const Role = require("../utils/userRoles.utils");

routes
  .route("/cinemas")
  .post(
    authMiddleware.authCheck,
    authMiddleware.authRole(Role.Admin),
    uploadImage,
    cinemaController.createCinema
  )
  .put(
    authMiddleware.authCheck,
    authMiddleware.authRole(Role.Admin),
    cinemaController.createCinema
  )
  .get(cinemaController.listCinemas);
routes
  .route("/cinemas/:id")
  .get(authMiddleware.authCheck, cinemaController.detailCinema)
  .delete(
    authMiddleware.authCheck,
    authMiddleware.authRole(Role.Admin),
    cinemaController.deleteCinema
  )
  .patch(
    authMiddleware.authCheck,
    authMiddleware.authRole(Role.Admin),
    uploadImage,
    cinemaController.updateCinema
  )
  .put(
    authMiddleware.authCheck,
    authMiddleware.authRole(Role.Admin),
    cinemaController.updateCinema
  );

module.exports = routes;
