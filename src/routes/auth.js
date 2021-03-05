const routes = require("express").Router();
const authController = require("../controllers/auth");
const {
  createUserSchema,
  validateLogin,
} = require("../middlewares/userValidator.middleware");
const uploadImage = require("../helpers/uploadFileUser");
const validator = require("../middlewares/validator");
const authMiddleware = require("../middlewares/auth");

routes.post("/auth/login", validateLogin, authController.login);
routes.post("/auth/register", createUserSchema, authController.register);
routes
  .route("/user/:id")
  .patch(uploadImage, validator.validationResult, authController.updateUser)
  .get(authMiddleware.authCheck, authController.getUser);

module.exports = routes;
