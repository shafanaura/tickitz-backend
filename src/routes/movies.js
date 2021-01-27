const routes = require("express").Router();
const movieController = require("../controllers/movie");
const authMiddleware = require("../middlewares/auth");
const Role = require("../utils/userRoles.utils");
routes
	.route("/movies")
	.post(
		authMiddleware.authCheck,
		authMiddleware.authRole(Role.Admin),
		movieController.createMovie,
	)
	.put(
		authMiddleware.authCheck,
		authMiddleware.authRole(Role.Admin),
		movieController.createMovie,
	)
	.get(movieController.listMovies);
routes
	.route("/movies/:id")
	.get(movieController.detailMovie)
	.delete(
		authMiddleware.authCheck,
		authMiddleware.authRole(Role.Admin),
		movieController.deleteMovie,
	)
	// .patch(
	// 	authMiddleware.authCheck,
	// 	authMiddleware.authRole(Role.Admin),
	// 	movieController.updateMovie,
	// )
	.patch(
		authMiddleware.authCheck,
		authMiddleware.authRole(Role.Admin),
		movieController.updateGenreMovie,
	)
	.put(
		authMiddleware.authCheck,
		authMiddleware.authRole(Role.Admin),
		movieController.updateMovie,
	);

module.exports = routes;
