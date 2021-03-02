const routes = require("express").Router();
const showtimeController = require("../controllers/showtime");
const authMiddleware = require("../middlewares/auth");
const Role = require("../utils/userRoles.utils");

routes
	.route("/showtimes")
	.post(
		authMiddleware.authCheck,
		authMiddleware.authRole(Role.Admin),
		showtimeController.createShowtime,
	)
	.get(showtimeController.listShowtime);
module.exports = routes;
