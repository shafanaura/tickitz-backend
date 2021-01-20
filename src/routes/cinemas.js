const routes = require("express").Router();
const cinemaController = require("../controllers/cinema");
const validator = require("../middlewares/validator");
// user
routes.get("/cinemas", cinemaController.listCinemas);
routes.get("/cinemas/:id", cinemaController.detailCinema);
// admin
routes
	.route("/admin/cinemas")
	.post(validator.movieInfo, validator.result, cinemaController.createCinema)
	.put(validator.movieInfo, validator.result, cinemaController.createCinema)
	.get(cinemaController.listCinemas);
routes
	.route("/admin/cinemas/:id")
	.get(cinemaController.detailCinema)
	.delete(cinemaController.deleteCinema)
	.patch(cinemaController.updateCinema)
	.put(cinemaController.updateCinema);

module.exports = routes;
