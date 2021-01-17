const routes = require("express").Router();
const cinemaController = require("../controllers/cinema");
// user
routes.get("/cinemas", cinemaController.read);
routes.get("/cinemas/:id", cinemaController.show);
// admin
routes
	.route("/admin/cinemas")
	.post(cinemaController.create)
	.get(cinemaController.read);
routes
	.route("/admin/cinemas/:id")
	.get(cinemaController.show)
	.patch(cinemaController.update)
	.delete(cinemaController.delete);

module.exports = routes;
