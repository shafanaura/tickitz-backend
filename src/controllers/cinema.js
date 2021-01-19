const cinemaModel = require("../models/cinemas");

exports.createCinema = (req, res) => {
	const data = req.body;
	cinemaModel.createCinema(data, (results) => {
		if (results.affectedRows > 0) {
			cinemaModel.getCinemaById(results.insertId, (finalResult) => {
				if (finalResult.length > 0) {
					return res.json({
						status: true,
						message: "Details of cinema",
						results: finalResult[0],
					});
				} else {
					return res.status(400).json({
						status: false,
						message: "Failed ro create cinema",
					});
				}
			});
		}
	});
};

exports.detailCinema = (req, res) => {
	const { id } = req.params;
	cinemaModel.getCinemaById(id, (results) => {
		if (results.length > 0) {
			return res.json({
				status: true,
				message: "Details of cinema",
				results: results[0],
			});
		} else {
			return res.status(400).json({
				status: false,
				message: "cinema not exists",
			});
		}
	});
};

exports.listCinemas = (req, res) => {
	const cond = req.query;
	cond.search = cond.search || "";
	cond.page = Number(cond.page) || 1;
	cond.limit = Number(cond.limit) || 5;
	cond.dataLimit = cond.limit * cond.page;
	cond.offset = (cond.page - 1) * cond.limit;
	cond.sort = cond.sort || "id";
	cond.order = cond.order || "ASC";
	cinemaModel.getCinemasByCondition(cond, (results) => {
		return res.json({
			status: true,
			message: "List of all cinemas",
			results,
		});
	});
};

exports.deleteCinema = (req, res) => {
	const { id } = req.params;
	cinemaModel.getCinemaById(id, (initialResult) => {
		if (initialResult.length > 0) {
			cinemaModel.deleteCinemaById(id, (results) => {
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

exports.updateCinema = (req, res) => {
	const { id } = req.params;
	const data = req.body;
	cinemaModel.getCinemaById(id, (initialResult) => {
		if (initialResult.length > 0) {
			cinemaModel.updateCinema(id, data, (results) => {
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
