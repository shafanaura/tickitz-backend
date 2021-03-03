const routes = require("express").Router();
const orderController = require("../controllers/order");
const authMiddleware = require("../middlewares/auth");

routes.post("/orders", authMiddleware.authCheck, orderController.createOrder);

module.exports = routes;
