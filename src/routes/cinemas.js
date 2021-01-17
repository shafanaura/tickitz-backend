const routes = require("express").Router();
const cinemaController = require("../controllers/cinema");
// user
routes.get("/cinemas", cinemaController.listCinemas.read);
routes.get("/cinemas/:id", cinemaController.listCinemas.show);
// admin
routes.post("/admin/cinemas", cinemaController.listCinemas.create);
routes.get("/admin/cinemas/:id", cinemaController.listCinemas.show);
routes.get("/admin/cinemas", cinemaController.listCinemas.read);
routes.put("/admin/cinemas:id", cinemaController.listCinemas.update);
routes.delete("/admin/:movieId", cinemaController.listCinemas.delete);

module.exports = routes;
