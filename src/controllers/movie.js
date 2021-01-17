let movies = require("../helpers/listMovies");

module.exports = {
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
		const id = Number(req.params.id);
		movies.filter((item) => {
			if (item.id == id) {
				item.id = id;
				item.title = req.body.title;
				item.genre = req.body.genre;

				return item;
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
		let id = Number(req.params.id);
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
