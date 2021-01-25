const cinemaModel = require("../models/cinemas");
const timeModel = require("../models/times");
const cinemaTimeModel = require("../models/cinemaTimes");
const multer = require("multer");
const upload = require("../helpers/upload").single("picture");
const qs = require("querystring");
const { APP_URL } = process.env;

exports.createCinema = (req, res) => {
	upload(req, res, async (err) => {
		const data = req.body;
		const selectedTime = [];
		if (err instanceof multer.MulterError) {
			return res.status(400).json({
				status: false,
				message: "Error uploading file",
			});
		} else if (err) {
			return res.status(400).json({
				status: false,
				message: "Error uploading file",
			});
		}
		if (typeof data.idTime === "object") {
			const results = await timeModel.checkTimesAsync(data.idTime);
			if (results.length !== data.idTime.length) {
				return res.status(400).json({
					status: false,
					message: "Some Time are unavailable",
				});
			} else {
				results.forEach((item) => {
					selectedTime.push(item.id);
				});
			}
		} else if (typeof data.idTime === "string") {
			const results = await timeModel.checkTimesAsync([data.idTime]);
			if (results.length !== data.idTime.length) {
				return res.status(400).json({
					status: false,
					message: "Some Time are unavailable",
				});
			} else {
				results.forEach((item) => {
					selectedTime.push(item.id);
				});
			}
		}
		const cinemaData = {
			name: data.name,
			picture: (req.file && req.file.path) || null,
			address: data.address,
			price: data.price,
			createdBy: req.userData.id,
		};
		const initialResult = await cinemaModel.createCinemasAsync(cinemaData);
		if (initialResult.affectedRows > 0) {
			if (selectedTime.length > 0) {
				await cinemaTimeModel.createBulkCinemaTimes(
					initialResult.insertId,
					selectedTime,
				);
			}
			const cinemas = await cinemaModel.getCinemaByIdWithTimeAsync(
				initialResult.insertId,
			);
			if (cinemas.length > 0) {
				return res.json({
					status: true,
					message: "Cinema successfully created",
					results: {
						id: cinemas[0].id,
						name: cinemas[0].name,
						picture: cinemas[0].picture,
						address: cinemas[0].address,
						price: cinemas[0].price,
						timeName: cinemas.map((item) => item.timeName),
					},
				});
			} else {
				return res.status(400).json({
					status: false,
					message: "Failed ro create cinema",
				});
			}
		}
	});
};

exports.detailCinema = async (req, res) => {
	const { id } = req.params;
	const results = await cinemaModel.getCinemaByIdWithTimeAsync(id);
	if (results.length > 0) {
		return res.json({
			status: true,
			message: "Details of cinema",
			results: {
				id: results[0].id,
				name: results[0].name,
				picture: results[0].picture,
				address: results[0].address,
				price: results[0].price,
				timeName: results.map(({ timeName }) => timeName),
			},
		});
	} else {
		return res.status(400).json({
			status: false,
			message: "cinema not exists",
		});
	}
};

exports.listCinemas = async (req, res) => {
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

	const countData = await cinemaModel.getCinemasCountByConditionAsync(cond);
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
			? APP_URL.concat(`/cinemas?${nextQuery}`)
			: null;
	pageInfo.prevLink =
		cond.page > 1 ? APP_URL.concat(`/cinemas?${prevQuery}`) : null;

	const results = await cinemaModel.getCinemasByCondition(cond);
	if (results) {
		return res.json({
			status: true,
			message: "List of all cinemas",
			results,
			pageInfo,
		});
	}
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
			return res.status(400).json({
				status: true,
				message: "Failed to delete data",
			});
		}
	});
};

exports.updateCinema = async (req, res) => {
	const { id } = req.params;
	const data = req.body;
	const initialResult = await cinemaModel.getCinemaByIdWithTimeAsync(id);
	if (initialResult.length > 0) {
		const results = cinemaModel.updateCinema(id, data);
		if (results) {
			return res.json({
				status: true,
				message: "data successfully updated",
				results: {
					...initialResult[0],
					...data,
				},
			});
		}
	} else {
		return res.status(400).json({
			status: false,
			message: "Failed to update data",
		});
	}
};
