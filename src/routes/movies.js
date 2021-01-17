const routes = require("express").Router();
const movieController = require("../controllers/movie");
// user
routes.get("/movies", movieController.read);
routes.get("/movies/:id", movieController.show);
// admin
routes
	.route("/admin/movies")
	.post(movieController.create)
	.get(movieController.read);
routes
	.route("/admin/movies/:id")
	.get(movieController.show)
	.patch(movieController.update)
	.delete(movieController.delete);

module.exports = routes;
