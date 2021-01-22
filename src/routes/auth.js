const routes = require("express").Router();
const authController = require("../controllers/auth");

// user
routes.post("/auth/login", authController.login);
routes.post("/auth/register", authController.register);
// routes.get("/movies/:id", movieController.detailMovie);
// admin
// routes
// 	.route("/admin/movies")
// 	.post(movieController.createMovie)
// 	.put(movieController.createMovie)
// 	.get(movieController.listMovies);
// routes
// 	.route("/admin/movies/:id")
// 	.get(movieController.detailMovie)
// 	.delete(movieController.deleteMovie)
// 	.patch(movieController.updateMovie)
// 	.put(movieController.updateMovie);

module.exports = routes;
