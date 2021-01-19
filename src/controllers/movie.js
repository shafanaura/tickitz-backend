const movieModel = require("../models/movies");

exports.createMovie = (req, res) => {
	const data = req.body;
	movieModel.createMovie(data, (results) => {
		if (results.affectedRows > 0) {
			movieModel.getMovieById(results.insertId, (finalResult) => {
				if (finalResult.length > 0) {
					return res.json({
						status: true,
						message: "Details of movie",
						results: finalResult[0],
					});
				} else {
					return res.status(400).json({
						status: false,
						message: "Failed ro create movie",
					});
				}
			});
		}
	});
};

exports.detailMovie = (req, res) => {
	const { id } = req.params;
	movieModel.getMovieById(id, (results) => {
		if (results.length > 0) {
			return res.json({
				status: true,
				message: "Details of movie",
				results: results[0],
			});
		} else {
			return res.status(400).json({
				status: false,
				message: "Movie not exists",
			});
		}
	});
};

exports.listMovies = (req, res) => {
	const cond = req.query;
	cond.search = cond.search || "";
	cond.page = Number(cond.page) || 1;
	cond.limit = Number(cond.limit) || 5;
	cond.dataLimit = cond.limit * cond.page;
	cond.offset = (cond.page - 1) * cond.limit;
	cond.sort = cond.sort || "id";
	cond.order = cond.order || "ASC";
	movieModel.getMoviesByCondition(cond, (results) => {
		return res.json({
			status: true,
			message: "List of all movies",
			results,
		});
	});
};

exports.deleteMovie = (req, res) => {
	const { id } = req.params;
	movieModel.getMovieById(id, (initialResult) => {
		if (initialResult.length > 0) {
			movieModel.deleteMovieById(id, (results) => {
				return res.json({
					status: true,
					message: "Data deleted successfully",
					results: initialResult[0],
				});
			});
		} else {
			return res.json({
				status: true,
				message: "Failed to delete data",
			});
		}
	});
};

exports.updateMovie = (req, res) => {
	const { id } = req.params;
	const data = req.body;
	movieModel.getMovieById(id, (initialResult) => {
		if (initialResult.length > 0) {
			movieModel.updateMovie(id, data, (results) => {
				return res.json({
					status: true,
					message: "data successfully updated",
					results: {
						...initialResult[0],
						...data,
					},
				});
			});
		} else {
			return res.json({
				status: true,
				message: "Failed to update data",
			});
		}
	});
};
