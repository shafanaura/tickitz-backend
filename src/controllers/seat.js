const seatModel = require("../models/seats");
const { APP_URL } = process.env;
const qs = require("querystring");
const status = require("../helpers/Response");

exports.createSeat = async (req, res) => {
	const data = req.body;
	const results = await seatModel.createSeat(data);
	if (results) {
		return status.ResponseStatus(res, 200, "seat created successfully", {
			id: results.insertId,
			...data,
		});
	}
};

exports.listSeats = async (req, res) => {
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

	const countData = await seatModel.getSeatCountByConditionAsync(cond);
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
			? APP_URL.concat(`Seats?${nextQuery}`)
			: null;
	pageInfo.prevLink =
		cond.page > 1 ? APP_URL.concat(`Seats?${prevQuery}`) : null;

	const results = await seatModel.getSeatsByCondition(cond);
	if (results) {
		return status.ResponseStatus(
			res,
			200,
			"List of all Seats",
			results,
			pageInfo,
		);
	}
};

exports.updateSeat = async (req, res) => {
	const { id } = req.params;
	const data = req.body;
	const initialResult = await seatModel.getSeatById(id);
	if (initialResult.length > 0) {
		const results = seatModel.updateSeat(id, data);
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

exports.deleteSeat = async (req, res) => {
	const { id } = req.params;
	const initialResult = await seatModel.getSeatById(id);
	if (initialResult.length > 0) {
		const results = seatModel.deleteSeatById(id);
		if (results) {
			return status.ResponseStatus(
				res,
				420,
				"Data deleted successfully",
				initialResult[0],
			);
		}
	} else {
		return status.ResponseStatus(res, 400, "Failed to delete data");
	}
};

exports.detailSeat = async (req, res) => {
	const { id } = req.params;
	const results = await seatModel.getSeatById(id);
	if (results.length > 0) {
		return status.ResponseStatus(res, 200, "Details of Seat", results[0]);
	} else {
		return status.ResponseStatus(res, 400, "Seat not exists");
	}
};
