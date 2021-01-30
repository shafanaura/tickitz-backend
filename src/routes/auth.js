const routes = require("express").Router();
const authController = require("../controllers/auth");
const {
	createUserSchema,
	validateLogin,
} = require("../middlewares/userValidator.middleware");

routes.post("/auth/login", validateLogin, authController.login);
routes.post("/auth/register", createUserSchema, authController.register);

module.exports = routes;
