let cinemas = require("../helpers/listCinemas");
const { LIMIT_DATA, APP_URL } = process.env;

module.exports = {
	show: (req, res) => {
		const id = req.params.id;
		const data = cinemas.filter((cinema) => {
			return cinema.id == id;
		});
		res.send(data);
	},
	read: (req, res) => {
		const { page = 1, limit = LIMIT_DATA } = req.query;
		const paging = Number(page * limit) - limit;
		const nextPage = Number(page + 1);
		let nextPageData = [];
		const offset = limit * page;

		let results = [];

		if (cinemas.length > 0) {
			nextPageData = cinemas.slice(nextPage, offset);
			results = cinemas.slice(paging, offset);
		} else {
			res.json({
				status: false,
				message: "cinemas data is empty",
			});
		}

		return res.json({
			status: true,
			message: "List of cinemas",
			data: results,
			pageInfo: {
				totalData: results.length,
				currentPage: Number(page),
				nextLink:
					nextPageData.length > 0
						? `${APP_URL}cinemas?page=${Number(page) + 1}`
						: null,
				prevLink:
					page > 1 ? `${APP_URL}cinemas?page=${Number(page) - 1}` : null,
			},
		});
	},
	create: (req, res) => {
		cinemas.push(req.body);
		res.json({
			status: true,
			data: cinemas,
			message: "cinema data successfully added",
			method: req.method,
			url: req.url,
		});
	},
	update: (req, res) => {
		const id = Number(req.params.id);
		cinemas.filter((item) => {
			if (item.id == id) {
				item.id = id;
				item.title = req.body.title;
				item.price = req.body.price;

				return item;
			}
		});
		res.json({
			status: true,
			data: cinemas,
			message: "cinema data successfully updated",
			method: req.method,
			url: req.url,
		});
	},
	delete: (req, res) => {
		let id = Number(req.params.id);
		cinemas = cinemas.filter((cinema) => cinema.id != id);
		res.json({
			status: true,
			data: cinemas,
			message: "cinema data successfully deleted",
			method: req.method,
			url: req.url,
		});
	},
};
