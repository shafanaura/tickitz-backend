const routes = require("express").Router();
const orderController = require("../controllers/order");
const authMiddleware = require("../middlewares/auth");
const { validateOrder } = require("../middlewares/userValidator.middleware");

routes
  .route("/orders")
  .post(authMiddleware.authCheck, orderController.createOrder)
  .get(authMiddleware.authCheck, orderController.listOrder);

module.exports = routes;
