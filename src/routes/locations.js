const routes = require("express").Router();
const locationController = require("../controllers/location");
const authMiddleware = require("../middlewares/auth");
const Role = require("../utils/userRoles.utils");
routes
	.route("/locations")
	.post(
		authMiddleware.authCheck,
		authMiddleware.authRole(Role.Admin),
		locationController.createLocation,
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
