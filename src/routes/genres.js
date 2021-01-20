const routes = require("express").Router();
const genreController = require("../controllers/genre");
// user
routes.get("/genres", genreController.listGenres);
// routes.get("/genres/:name", genreController.show);
// admin
routes
	.route("/admin/genres/:id")
	.get(genreController.detailGenre)
	.delete(genreController.deleteGenre)
	.patch(genreController.updateGenre);

routes
	.route("/admin/genres")
	.post(genreController.createGenre)
	.get(genreController.listGenres);
// 	.get(genreController.readDb);
// routes.get("/admin/genres/:name", genreController.show);

module.exports = routes;
