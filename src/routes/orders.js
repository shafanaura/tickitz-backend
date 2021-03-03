const routes = require("express").Router();
const orderController = require("../controllers/order");
const authMiddleware = require("../middlewares/auth");
const { validateOrder } = require("../middlewares/userValidator.middleware");

routes.post(
  "/orders",
  validateOrder,
  authMiddleware.authCheck,
  orderController.createOrder
);

module.exports = routes;
