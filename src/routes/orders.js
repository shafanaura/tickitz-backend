const routes = require("express").Router();
const orderController = require("../controllers/order");
const authMiddleware = require("../middlewares/auth");
const { validateOrder } = require("../middlewares/userValidator.middleware");

routes.post("/orders", authMiddleware.authCheck, orderController.createOrder);
routes.get("/orders/:id", authMiddleware.authCheck, orderController.listOrder);

module.exports = routes;
