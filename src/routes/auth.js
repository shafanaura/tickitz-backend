const routes = require("express").Router();
const authController = require("../controllers/auth");

routes.post("/auth/login", authController.login);
routes.post("/auth/register", authController.register);

module.exports = routes;
