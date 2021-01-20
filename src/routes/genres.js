const routes = require("express").Router();
const genreController = require("../controllers/genre");
const validator = require("../middlewares/validator");
// user
routes.get("/genres", genreController.listGenres);
// routes.get("/genres/:name", genreController.show);
// admin
routes
	.route("/admin/genres/:id")
	.get(genreController.detailGenre)
	.delete(genreController.deleteGenre)
	.patch(genreController.updateGenre)
	.put(genreController.updateGenre);

routes
	.route("/admin/genres")
	.post(validator.genreInfo, validator.result, genreController.createGenre)
	.get(genreController.listGenres)
	.put(validator.genreInfo, validator.result, genreController.createGenre);
// 	.get(genreController.readDb);
// routes.get("/admin/genres/:name", genreController.show);

module.exports = routes;
