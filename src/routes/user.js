const routes = require("express").Router();
const authController = require("../controllers/user");
const uploadImage = require("../middlewares/uploadFileUser");
const validator = require("../middlewares/validator");
const authMiddleware = require("../middlewares/auth");

routes
  .route("/user")
  .patch(
    authMiddleware.authCheck,
    uploadImage,
    validator.validationResult,
    authController.updateUser
  )
  .get(authMiddleware.authCheck, authController.getUser);

module.exports = routes;
