const movieModel = require("../models/movies");
const genreModel = require("../models/genres");
const movieGenreModel = require("../models/movieGenres");
const multer = require("multer");
const { APP_URL } = process.env;
const upload = require("../helpers/upload").single("picture");

exports.createMovie = (req, res) => {
	upload(req, res, async (err) => {
		const data = req.body;
		const selectedGenre = [];
		if (err instanceof multer.MulterError) {
			return res.json({
				status: false,
				message: "Error uploading file",
			});
		} else if (err) {
			return res.json({
				status: false,
				message: "Error uploading file",
			});
		}
		if (typeof data.idGenre === "object") {
			const results = await genreModel.checkGenresAsync(data.idGenre);
			if (results.length !== data.idGenre.length) {
				return res.json({
					status: false,
					message: "Some genre are unavailable",
				});
			} else {
				results.forEach((item) => {
					selectedGenre.push(item.id);
				});
			}
		} else if (typeof data.idGenre === "string") {
			const results = await genreModel.checkGenresAsync([data.idGenre]);
			if (results.length !== data.idGenre.length) {
				return res.json({
					status: false,
					message: "Some genre are unavailable",
				});
			} else {
				results.forEach((item) => {
					selectedGenre.push(item.id);
				});
			}
		}
		console.log(data);
		const movieData = {
			title: data.title,
			picture: (req.file && req.file.path) || null,
			releaseDate: data.releaseDate,
			directed: data.directed,
			duration: data.duration,
			cast: data.cast,
			synopsis: data.synopsis,
		};
		console.log(movieData);
		const initialResult = await movieModel.createMoviesAsync(movieData);
		if (initialResult.affectedRows > 0) {
			if (selectedGenre.length > 0) {
				await movieGenreModel.createBulkMovieGenres(
					initialResult.insertId,
					selectedGenre,
				);
			}
			const movies = await movieModel.getMovieByIdWithGenreAsync(
				initialResult.insertId,
			);

			if (movies.length > 0) {
				return res.json({
					status: true,
					message: "Movie successfully created",
					results: {
						id: movies[0].id,
						title: movies[0].title,
						picture: movies[0].picture,
						releaseDate: movies[0].releaseDate,
						directed: movies[0].directed,
						duration: movies[0].duration,
						cast: movies[0].cast,
						synopsis: movies[0].synopsis,
						genres: movies.map((item) => item.genreName),
					},
				});
			} else {
				return res.status(400).json({
					status: false,
					message: "Failed ro create movie",
				});
			}
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
			pageInfo: {
				totalData: results.length,
				currentPage: Number(cond.page),
				nextLink:
					results.length > 0
						? `${APP_URL}movies?page=${Number(cond.page) + 1}`
						: null,
				prevLink:
					cond.page > 1
						? `${APP_URL}movies?page=${Number(cond.page) - 1}`
						: null,
			},
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
				status: false,
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
