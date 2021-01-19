const routes = require("express").Router();
const cinemaController = require("../controllers/cinema");
// user
routes.get("/cinemas", cinemaController.listCinemas);
routes.get("/cinemas/:id", cinemaController.detailCinema);
// admin
routes
	.route("/admin/cinemas")
	.post(cinemaController.createCinema)
	.get(cinemaController.listCinemas);
routes
	.route("/admin/cinemas/:id")
	.get(cinemaController.detailCinema)
	.delete(cinemaController.deleteCinema)
	.patch(cinemaController.updateCinema);

module.exports = routes;
