const timeModel = require("../models/times");
const { APP_URL } = process.env;

exports.createTime = (req, res) => {
	const data = req.body;
	timeModel.createTime(data, (results) => {
		console.log(results);
		return res.json({
			status: true,
			message: "time created successfully",
			results: {
				id: results.insertId,
				...data,
			},
		});
	});
};

// exports.listTimes = (req, res) => {
// 	const cond = req.query;
// 	cond.search = cond.search || "";
// 	cond.page = Number(cond.page) || 1;
// 	cond.limit = Number(cond.limit) || 5;
// 	cond.dataLimit = cond.limit * cond.page;
// 	cond.offset = (cond.page - 1) * cond.limit;
// 	cond.sort = cond.sort || "id";
// 	cond.order = cond.order || "ASC";

// 	timeModel.getTimesByCondition(cond, (results) => {
// 		return res.json({
// 			status: true,
// 			message: "List of all times",
// 			results,
// 			pageInfo: {
// 				totalData: results.length,
// 				currentPage: Number(cond.page),
// 				nextLink:
// 					results.length > 0
// 						? `${APP_URL}times?page=${Number(cond.page) + 1}`
// 						: null,
// 				prevLink:
// 					cond.page > 1
// 						? `${APP_URL}times?page=${Number(cond.page) - 1}`
// 						: null,
// 			},
// 		});
// 	});
// };

// exports.updateTime = (req, res) => {
// 	const { id } = req.params;
// 	const data = req.body;
// 	timeModel.getTimeById(id, (initialResult) => {
// 		if (initialResult.length > 0) {
// 			timeModel.updateTime(id, data, (results) => {
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
// 			return res.json({
// 				status: false,
// 				message: "Failed to update data",
// 			});
// 		}
// 	});
// };

// exports.deleteTime = (req, res) => {
// 	const { id } = req.params;
// 	timeModel.getTimeById(id, (initialResult) => {
// 		if (initialResult.length > 0) {
// 			timeModel.deleteTimeById(id, (results) => {
// 				return res.json({
// 					status: true,
// 					message: "Data deleted successfully",
// 					results: initialResult[0],
// 				});
// 			});
// 		} else {
// 			return res.json({
// 				status: false,
// 				message: "Failed to delete data",
// 			});
// 		}
// 	});
// };

// exports.detailTime = (req, res) => {
// 	const { id } = req.params;
// 	timeModel.getTimeById(id, (results) => {
// 		if (results.length > 0) {
// 			return res.json({
// 				status: true,
// 				message: "Details of time",
// 				results: results[0],
// 			});
// 		} else {
// 			return res.status(400).json({
// 				status: false,
// 				message: "time not exists",
// 			});
// 		}
// 	});
// };
