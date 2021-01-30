const routes = require("express").Router();
const genreController = require("../controllers/genre");
const authMiddleware = require("../middlewares/auth");
const Role = require("../utils/userRoles.utils");

routes.get("/genres", genreController.listGenres);
// routes.get("/genres/:name", genreController.show);
routes
	.route("/genres/:id")
	.get(genreController.detailGenre)
	.delete(
		authMiddleware.authCheck,
		authMiddleware.authRole(Role.Admin),
		genreController.deleteGenre,
	)
	.patch(
		authMiddleware.authCheck,
		authMiddleware.authRole(Role.Admin),
		genreController.updateGenre,
	)
	.put(
		authMiddleware.authCheck,
		authMiddleware.authRole(Role.Admin),
		genreController.updateGenre,
	);

routes
	.route("/genres")
	.post(
		authMiddleware.authCheck,
		authMiddleware.authRole(Role.Admin),
		genreController.createGenre,
	)
	.get(genreController.listGenres)
	.put(
		authMiddleware.authCheck,
		authMiddleware.authRole(Role.Admin),
		genreController.createGenre,
	);

module.exports = routes;
