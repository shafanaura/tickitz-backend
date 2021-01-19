const routes = require("express").Router();
const cinemaController = require("../controllers/cinema");
const validators = require("../middlewares/validators");
// user
routes.get("/cinemas", cinemaController.listCinemas);
routes.get("/cinemas/:id", cinemaController.detailCinema);
// admin
routes
	.route("/admin/cinemas")
	.post(validators.charInfo, validators.result, cinemaController.createCinema)
	.get(cinemaController.listCinemas);
routes
	.route("/admin/cinema/:id")
	.get(cinemaController.detailCinema)
	.delete(cinemaController.deleteCinema)
	.patch(cinemaController.updateCinema);

module.exports = routes;
