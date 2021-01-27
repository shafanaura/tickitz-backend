const routes = require("express").Router();
const timeController = require("../controllers/time");
const authMiddleware = require("../middlewares/auth");
const Role = require("../utils/userRoles.utils");
routes
	.route("/times")
	.post(
		authMiddleware.authCheck,
		authMiddleware.authRole(Role.Admin),
		timeController.createTime,
	)
	.put(
		authMiddleware.authCheck,
		authMiddleware.authRole(Role.Admin),
		timeController.createTime,
	)
	.get(timeController.listTimes);
routes
	.route("/times/:id")
	.get(timeController.detailTime)
	.delete(
		authMiddleware.authCheck,
		authMiddleware.authRole(Role.Admin),
		timeController.deleteTime,
	)
	.patch(
		authMiddleware.authCheck,
		authMiddleware.authRole(Role.Admin),
		timeController.updateTime,
	)
	.put(
		authMiddleware.authCheck,
		authMiddleware.authRole(Role.Admin),
		timeController.updateTime,
	);

module.exports = routes;
