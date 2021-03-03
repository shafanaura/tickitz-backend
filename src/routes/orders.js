const routes = require("express").Router();
const orderController = require("../controllers/order");
const authMiddleware = require("../middlewares/auth");

routes.post("/orders", orderController.createOrder);

module.exports = routes;
