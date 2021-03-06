const routes = require("express").Router();
const authController = require("../controllers/auth");
const uploadImage = require("../middlewares/uploadProfile");
const {
  createUserSchema,
  validateLogin,
} = require("../middlewares/userValidator.middleware");

routes.post("/auth/login", validateLogin, authController.login);
routes.post("/auth/register", createUserSchema, authController.register);
routes.patch("/user/:id", uploadImage, authController.UpdateUser);

module.exports = routes;
