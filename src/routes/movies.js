const routes = require("express").Router();
const movieController = require("../controllers/movie");
// user
routes.get("/movies", movieController.listMovies);
routes.get("/movies/:id", movieController.detailMovie);
// admin
routes
	.route("/admin/movies")
	.post(movieController.createMovie)
	.get(movieController.listMovies);
routes
	.route("/admin/movies/:id")
	.get(movieController.detailMovie)
	.delete(movieController.deleteMovie)
	.patch(movieController.updateMovie);

module.exports = routes;
