const routes = require("express").Router();
const seatController = require("../controllers/seat");
const authMiddleware = require("../middlewares/auth");
const Role = require("../utils/userRoles.utils");
routes
	.route("/seats")
	.post(
		authMiddleware.authCheck,
		authMiddleware.authRole(Role.Admin),
		seatController.createSeat,
	)
	.put(
		authMiddleware.authCheck,
		authMiddleware.authRole(Role.Admin),
		seatController.createSeat,
	)
	.get(seatController.listSeats);
routes
	.route("/seats/:id")
	.get(seatController.detailSeat)
	.delete(
		authMiddleware.authCheck,
		authMiddleware.authRole(Role.Admin),
		seatController.deleteSeat,
	)
	.patch(
		authMiddleware.authCheck,
		authMiddleware.authRole(Role.Admin),
		seatController.updateSeat,
	)
	.put(
		authMiddleware.authCheck,
		authMiddleware.authRole(Role.Admin),
		seatController.updateSeat,
	);

module.exports = routes;
