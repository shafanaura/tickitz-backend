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
	);
// 	.put(
// 		authMiddleware.authCheck,
// 		authMiddleware.authRole(Role.Admin),
// 		timeController.createTime,
// 	)
// 	.get(timeController.listTimes);
// routes
// 	.route("/times/:id")
// 	.get(timeController.detailTime)
// 	.delete(
// 		authMiddleware.authCheck,
// 		authMiddleware.authRole(Role.Admin),
// 		timeController.deleteTime,
// 	)
// 	.patch(
// 		authMiddleware.authCheck,
// 		authMiddleware.authRole(Role.Admin),
// 		timeController.updateTime,
// 	)
// 	.put(
// 		authMiddleware.authCheck,
// 		authMiddleware.authRole(Role.Admin),
// 		timeController.updateTime,
// 	);

module.exports = routes;
