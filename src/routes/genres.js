const routes = require("express").Router();
const genreController = require("../controllers/genre");
// user
routes.get("/genres", genreController.read);
routes.get("/genres/:name", genreController.show);
// admin
routes
	.route("/admin/genres/:id")
	.get(genreController.showList)
	.delete(genreController.delete)
	.patch(genreController.update);

routes
	.route("/admin/genres")
	.post(genreController.create)
	// .get(genreController.read)
	.get(genreController.readDb);
routes.get("/admin/genres/:name", genreController.show);

module.exports = routes;
