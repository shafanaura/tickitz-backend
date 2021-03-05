const routes = require("express").Router();
const authController = require("../controllers/auth");
const {
  createUserSchema,
  validateLogin,
} = require("../middlewares/userValidator.middleware");
const uploadImage = require("../helpers/uploadFileUser");
const validator = require("../middlewares/validator");

routes.post("/auth/login", validateLogin, authController.login);
routes.post("/auth/register", createUserSchema, authController.register);
routes.patch(
  "/user/:id",
  uploadImage,
  validator.validationResult,
  authController.updateUser
);

module.exports = routes;
