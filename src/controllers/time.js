const timeModel = require("../models/times");
const { APP_URL } = process.env;
const qs = require("querystring");
const status = require("../helpers/Response");

exports.createTime = async (req, res) => {
	const data = req.body;
	const results = await timeModel.createTime(data);
	if (results) {
		return status.ResponseStatus(res, 200, "time created successfully", {
			id: results.insertId,
			...data,
		});
	}
};

exports.listTimes = async (req, res) => {
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

	const countData = await timeModel.getTimesCountByConditionAsync(cond);
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
			? APP_URL.concat(`times?${nextQuery}`)
			: null;
	pageInfo.prevLink =
		cond.page > 1 ? APP_URL.concat(`times?${prevQuery}`) : null;

	const results = await timeModel.getTimesByCondition(cond);
	if (results) {
		return status.ResponseStatus(
			res,
			200,
			"List of all times",
			results,
			pageInfo,
		);
	}
};

exports.updateTime = async (req, res) => {
	const { id } = req.params;
	const data = req.body;
	const initialResult = await timeModel.getTimeById(id);
	if (initialResult.length > 0) {
		const results = timeModel.updateTime(id, data);
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

exports.deleteTime = async (req, res) => {
	const { id } = req.params;
	const initialResult = await timeModel.getTimeById(id);
	if (initialResult.length > 0) {
		const results = timeModel.deleteTimeById(id);
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

exports.detailTime = async (req, res) => {
	const { id } = req.params;
	const results = await timeModel.getTimeById(id);
	if (results.length > 0) {
		return status.ResponseStatus(res, 200, "Details of time", results);
	} else {
		return status.ResponseStatus(res, 400, "time not exists");
	}
};
