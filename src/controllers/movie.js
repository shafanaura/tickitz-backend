const movieModel = require("../models/movies");
const genreModel = require("../models/genres");
const movieGenreModel = require("../models/movieGenres");
const multer = require("multer");
const upload = require("../helpers/upload").single("picture");
const { APP_URL } = process.env;
const status = require("../helpers/Response");
const qs = require("querystring");

exports.createMovie = (req, res) => {
	upload(req, res, async (err) => {
		const data = req.body;
		const selectedGenre = [];
		if (err instanceof multer.MulterError) {
			return status.ResponseStatus(res, 400, "Error uploading file");
		} else if (err) {
			return status.ResponseStatus(res, 400, "Error uploading file");
		}
		if (typeof data.idGenre === "object") {
			const results = await genreModel.checkGenres(data.idGenre);
			if (results.length !== data.idGenre.length) {
				return status.ResponseStatus(res, 400, "Some genre are unavailable");
			} else {
				results.forEach((item) => {
					selectedGenre.push(item.id);
				});
			}
		} else if (typeof data.idGenre === "string") {
			const results = await genreModel.checkGenres([data.idGenre]);
			if (results.length !== data.idGenre.length) {
				return status.ResponseStatus(res, 400, "Some genre are unavailable");
			} else {
				results.forEach((item) => {
					selectedGenre.push(item.id);
				});
			}
		}
		const movieData = {
			title: data.title,
			picture: (req.file && req.file.path) || null,
			releaseDate: data.releaseDate,
			directed: data.directed,
			duration: data.duration,
			cast: data.cast,
			synopsis: data.synopsis,
			createdBy: req.userData.id,
		};
		const initialResult = await movieModel.createMovie(movieData);
		if (initialResult.affectedRows > 0) {
			if (selectedGenre.length > 0) {
				await movieGenreModel.createBulkMovieGenres(
					initialResult.insertId,
					selectedGenre,
				);
			}
			const movies = await movieModel.getMovieByIdWithGenre(
				initialResult.insertId,
			);
			if (movies.length > 0) {
				return status.ResponseStatus(res, 200, "Movie successfully created", {
					id: movies[0].id,
					title: movies[0].title,
					genre: movies[0].genre,
					picture: movies[0].picture,
					releaseDate: movies[0].releaseDate,
					directed: movies[0].directed,
					duration: movies[0].duration,
					cast: movies[0].cast,
					synopsis: movies[0].synopsis,
					genres: movies.map((item) => item.genreName),
				});
			} else {
				return status.ResponseStatus(res, 400, "Failed to create movie");
			}
		}
	});
};

exports.detailMovie = async (req, res) => {
	const { id } = req.params;
	const results = await movieModel.getMovieByIdWithGenre(id);
	if (results.length > 0) {
		return status.ResponseStatus(res, 200, "Details of movie", {
			id: results[0].id,
			title: results[0].title,
			picture: results[0].picture,
			releaseDate: results[0].releaseDate,
			directed: results[0].directed,
			duration: results[0].duration,
			cast: results[0].cast,
			synopsis: results[0].synopsis,
			genreName: results.map(({ genreName }) => genreName),
		});
	} else {
		return status.ResponseStatus(res, 400, "Movie not exists");
	}
};

exports.listMovies = async (req, res) => {
	const cond = { ...req.query };
	cond.search = cond.search || "";
	cond.page = Number(cond.page) || 1;
	cond.limit = Number(cond.limit) || 5;
	cond.dataLimit = cond.limit * cond.page;
	cond.offset = (cond.page - 1) * cond.limit;
	cond.sort = cond.sort || "id";
	cond.order = cond.order || "ASC";

	const pageInfo = {
		nextLink: null,
		prevLink: null,
		totalData: 0,
		totalPage: 0,
		currentPage: 0,
	};

	const countData = await movieModel.getMoviesCountByCondition(cond);
	pageInfo.totalData = countData[0].totalData;
	pageInfo.totalPage = Math.ceil(pageInfo.totalData / cond.limit);
	pageInfo.currentPage = cond.page;
	const nextQuery = qs.stringify({
		...req.query,
		page: cond.page + 1,
	});
	const prevQuery = qs.stringify({
		...req.query,
		page: cond.page - 1,
	});
	pageInfo.nextLink =
		cond.page < pageInfo.totalPage
			? APP_URL.concat(`movies?${nextQuery}`)
			: null;
	pageInfo.prevLink =
		cond.page > 1 ? APP_URL.concat(`movies?${prevQuery}`) : null;

	const results = await movieModel.getMoviesByCondition(cond);
	if (results) {
		return status.ResponseStatus(
			res,
			200,
			"List of all movies",
			results,
			pageInfo,
		);
	}
};

exports.deleteMovie = async (req, res) => {
	const { id } = req.params;
	const initialResult = await movieModel.getMovieByIdWithGenre(id);
	if (initialResult.length > 0) {
		const results = await movieModel.deleteMovieById(id);
		if (results) {
			return status.ResponseStatus(
				res,
				200,
				"Data deleted successfully",
				initialResult[0],
			);
		}
	} else {
		return status.ResponseStatus(res, 400, "Failed to delete data");
	}
};

exports.updateMovie = async (req, res) => {
	const { id } = req.params;
	const data = req.body;
	const initialResult = await movieModel.getMovieByIdWithGenre(id);
	if (initialResult.length > 0) {
		const results = await movieModel.updateMovie(id, data);
		if (results) {
			return status.ResponseStatus(res, 200, "data successfully updated", {
				...initialResult[0],
				...data,
			});
		}
	} else {
		return status.ResponseStatus(res, 400, "Failed to update data");
	}
};

exports.updateGenreMovie = async (req, res) => {
	const { id } = req.params;
	const data = req.body;
	const initialResult = await movieModel.getMovieByIdWithGenre(id);
	if (initialResult.length > 0) {
		const results = await movieModel.updateGenreMovie(id, data);
		if (results) {
			return status.ResponseStatus(res, 400, "data successfully updated", {
				...initialResult[0],
				...data,
			});
		}
	} else {
		return status.ResponseStatus(res, 400, "Failed to update data");
	}
};
