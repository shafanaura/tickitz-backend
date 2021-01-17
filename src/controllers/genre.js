let data = require("../helpers/listMovies");
let dataGenre = require("../helpers/listGenre");
const listGenre = require("../helpers/listGenre");
const { LIMIT_DATA, APP_URL } = process.env;

module.exports = {
	// show list movie sort by genre from params
	show: (req, res) => {
		const { page = 1, limit = LIMIT_DATA } = req.query;
		const genre = req.params.name;
		const paging = Number(page * limit) - limit;
		const nextPage = Number(page + 1);
		let nextPageData = [];
		const offset = limit * page;

		let results = [];

		results = data.filter((movie) => {
			return movie.genre
				.toLocaleLowerCase()
				.includes(genre.toLocaleLowerCase());
		});
		nextPageData = results.slice(nextPage, offset);
		results = results.slice(paging, offset);

		return res.json({
			status: true,
			message: "List of movies",
			data: results,
			pageInfo: {
				totalData: results.length,
				currentPage: Number(page),
				nextLink:
					nextPageData.length > 0
						? `${APP_URL}/movies?page=${Number(page) + 1}`
						: null,
				prevLink:
					page > 1 ? `${APP_URL}/movies?page=${Number(page) - 1}` : null,
			},
		});
	},

	// read genre list movie sort by genre search query
	read: (req, res) => {
		const { page = 1, limit = LIMIT_DATA, genre = null } = req.query;
		const paging = Number(page * limit) - limit;
		const nextPage = Number(page + 1);
		let nextPageData = [];
		const offset = limit * page;

		let results = [];

		if (genre) {
			results = data.filter((movie) => {
				return movie.genre
					.toLocaleLowerCase()
					.includes(genre.toLocaleLowerCase());
			});
			nextPageData = results.slice(nextPage, offset);
			results = results.slice(paging, offset);
		} else {
			nextPageData = data.slice(nextPage, offset);
			results = data.slice(paging, offset);
		}

		return res.json({
			status: true,
			message: "List of movies",
			data: results,
			pageInfo: {
				totalData: results.length,
				currentPage: Number(page),
				nextLink:
					nextPageData.length > 0
						? `${APP_URL}/genres?page=${Number(page) + 1}`
						: null,
				prevLink:
					page > 1 ? `${APP_URL}/genres?page=${Number(page) - 1}` : null,
			},
		});
	},

	// read genre db
	readDb: (req, res) => {
		if (listGenre.length > 0) {
			res.json({
				status: true,
				data: listGenre,
				method: req.method,
				url: req.url,
			});
		} else {
			res.json({
				status: false,
				message: "listGenre data is empty",
			});
		}
	},

	// show list genre from listGenre database sort by id
	showList: (req, res) => {
		const id = req.params.id;
		const data = dataGenre.filter((item) => {
			return item.id == id;
		});
		res.send(data);
	},

	create: (req, res) => {
		dataGenre.push(req.body);
		res.json({
			status: true,
			data: dataGenre,
			message: "genre data successfully added",
			method: req.method,
			url: req.url,
		});
	},

	update: (req, res) => {
		const id = Number(req.params.id);
		dataGenre.filter((item) => {
			if (item.id == id) {
				item.id = id;
				item.genre = req.body.genre;

				return dataGenre;
			}
		});
		res.json({
			status: true,
			data: dataGenre,
			message: "genre data successfully updated",
			method: req.method,
			url: req.url,
		});
	},

	delete: (req, res) => {
		let id = Number(req.params.id);
		dataGenre = dataGenre.filter((item) => item.id != id);
		res.json({
			status: true,
			data: dataGenre,
			message: "genre data successfully deleted",
			method: req.method,
			url: req.url,
		});
	},
};
