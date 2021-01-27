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
	)
	.put(
		authMiddleware.authCheck,
		authMiddleware.authRole(Role.Admin),
		locationController.createLocation,
	)
	.get(locationController.listLocations);
routes
	.route("/locations/:id")
	.get(locationController.detailLocation)
	.delete(
		authMiddleware.authCheck,
		authMiddleware.authRole(Role.Admin),
		locationController.deleteLocation,
	)
	.patch(
		authMiddleware.authCheck,
		authMiddleware.authRole(Role.Admin),
		locationController.updateLocation,
	)
	.put(
		authMiddleware.authCheck,
		authMiddleware.authRole(Role.Admin),
		locationController.updateLocation,
	);

module.exports = routes;
