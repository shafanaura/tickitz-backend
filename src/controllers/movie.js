let movies = require("../helpers/listMovies");

exports.listMovies = {
	show: (req, res) => {
		const id = req.params.id;
		const data = movies.filter((movie) => {
			return movie.id == id;
		});
		res.send(data);
	},
	read: (req, res) => {
		if (movies.length > 0) {
			res.json({
				status: true,
				data: movies,
				method: req.method,
				url: req.url,
			});
		} else {
			res.json({
				status: false,
				message: "Movies data is empty",
			});
		}
	},
	create: (req, res) => {
		movies.push(req.body);
		res.json({
			status: true,
			data: movies,
			message: "Movie data successfully added",
			method: req.method,
			url: req.url,
		});
	},
	update: (req, res) => {
		const id = req.params.id;
		movies.filter((movie) => {
			if (movie.id == id) {
				movie.id = id;
				movie.title = req.body.title;
				movie.genre = req.body.genre;

				return movie;
			}
		});
		res.json({
			status: true,
			data: movies,
			message: "Movie data successfully updated",
			method: req.method,
			url: req.url,
		});
	},
	delete: (req, res) => {
		let id = req.params.movieId;
		movies = movies.filter((movie) => movie.id != id);
		res.json({
			status: true,
			data: movies,
			message: "Movie data successfully deleted",
			method: req.method,
			url: req.url,
		});
	},
};
