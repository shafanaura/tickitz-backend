const routes = require("express").Router();
const genreController = require("../controllers/genre");
// user
routes.get("/genres", genreController.listMovies.read);
routes.get("/genres/:name", genreController.listMovies.show);
// admin
routes
	.route("/admin/genres/:id")
	.get(genreController.listMovies.showList)
	.delete(genreController.listMovies.delete)
	.put(genreController.listMovies.update);

routes
	.route("/admin/genres")
	.post(genreController.listMovies.create)
	.get(genreController.listMovies.read);
routes.get("/admin/genres/:name", genreController.listMovies.show);
module.exports = routes;
