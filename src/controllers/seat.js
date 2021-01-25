const seatModel = require("../models/seats");
const { APP_URL } = process.env;

exports.createSeat = async (req, res) => {
	const data = req.body;
	const results = await seatModel.createSeat(data);
	if (results) {
		return res.json({
			status: true,
			message: "seat created successfully",
			results: {
				id: results.insertId,
				...data,
			},
		});
	}
};

// exports.listGenres = (req, res) => {
// 	const cond = req.query;
// 	cond.search = cond.search || "";
// 	cond.page = Number(cond.page) || 1;
// 	cond.limit = Number(cond.limit) || 5;
// 	cond.dataLimit = cond.limit * cond.page;
// 	cond.offset = (cond.page - 1) * cond.limit;
// 	cond.sort = cond.sort || "id";
// 	cond.order = cond.order || "ASC";

// 	genreModel.getGenresByCondition(cond, (results) => {
// 		return res.json({
// 			status: true,
// 			message: "List of all genres",
// 			results,
// 			pageInfo: {
// 				totalData: results.length,
// 				currentPage: Number(cond.page),
// 				nextLink:
// 					results.length > 0
// 						? `${APP_URL}genres?page=${Number(cond.page) + 1}`
// 						: null,
// 				prevLink:
// 					cond.page > 1
// 						? `${APP_URL}genres?page=${Number(cond.page) - 1}`
// 						: null,
// 			},
// 		});
// 	});
// };

// exports.updateGenre = (req, res) => {
// 	const { id } = req.params;
// 	const data = req.body;
// 	genreModel.getGenreById(id, (initialResult) => {
// 		if (initialResult.length > 0) {
// 			genreModel.updateGenre(id, data, (results) => {
// 				return res.json({
// 					status: true,
// 					message: "data successfully updated",
// 					results: {
// 						...initialResult[0],
// 						...data,
// 					},
// 				});
// 			});
// 		} else {
// 			return res.status(400).json({
// 				status: false,
// 				message: "Failed to update data",
// 			});
// 		}
// 	});
// };

// exports.deleteGenre = (req, res) => {
// 	const { id } = req.params;
// 	genreModel.getGenreById(id, (initialResult) => {
// 		if (initialResult.length > 0) {
// 			genreModel.deleteGenreById(id, (results) => {
// 				return res.json({
// 					status: true,
// 					message: "Data deleted successfully",
// 					results: initialResult[0],
// 				});
// 			});
// 		} else {
// 			return res.status(400).json({
// 				status: false,
// 				message: "Failed to delete data",
// 			});
// 		}
// 	});
// };

// exports.detailLocation = async (req, res) => {
// 	const { id } = req.params;
// 	const results = await locationModel.getLocationById(id);
// 	if (results.length > 0) {
// 		return res.json({
// 			status: true,
// 			message: "Details of Location",
// 			results: results[0],
// 		});
// 	} else {
// 		return res.status(400).json({
// 			status: false,
// 			message: "Location not exists",
// 		});
// 	}
// };
