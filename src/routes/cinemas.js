const routes = require("express").Router();
const cinemaController = require("../controllers/cinema");
const validator = require("../middlewares/validator");
// user
routes.get("/cinemas", cinemaController.listCinemas);
routes.get("/cinemas/:id", cinemaController.detailCinema);
// admin
routes
	.route("/admin/cinemas")
	.post(validator.charInfo, validator.result, cinemaController.createCinema)
	.get(cinemaController.listCinemas);
routes
	.route("/admin/cinema/:id")
	.get(cinemaController.detailCinema)
	.delete(cinemaController.deleteCinema)
	.patch(cinemaController.updateCinema);

module.exports = routes;
