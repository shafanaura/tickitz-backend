const routes = require("express").Router();
const movieController = require("../controllers/movie");
const validator = require("../middlewares/validator");
// user
routes.get("/movies", movieController.listMovies);
routes.get("/movies/:id", movieController.detailMovie);
// admin
routes
	.route("/admin/movies")
	.post(movieController.createMovie)
	.put(movieController.createMovie)
	.get(movieController.listMovies);
routes
	.route("/admin/movies/:id")
	.get(movieController.detailMovie)
	.delete(movieController.deleteMovie)
	.patch(movieController.updateMovie)
	.put(movieController.updateMovie);

module.exports = routes;
