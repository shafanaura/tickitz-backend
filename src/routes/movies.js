const routes = require("express").Router();
const movieController = require("../controllers/movie");
// user
routes.get("/movies", movieController.listMovies.read);
routes.get("/movies/:id", movieController.listMovies.show);
// admin
routes.post("/admin/movies", movieController.listMovies.create);
routes.get("/admin/movies/:id", movieController.listMovies.show);
routes.get("/admin/movies", movieController.listMovies.read);
routes.put("/admin/movies:id", movieController.listMovies.update);
routes.delete("/admin/:movieId", movieController.listMovies.delete);

module.exports = routes;
