const timeModel = require("../models/times");
const { APP_URL } = process.env;
const qs = require("querystring");

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
		return res.json({
			status: true,
			message: "List of all times",
			results,
			pageInfo,
		});
	}
};

exports.updateTime = async (req, res) => {
	const { id } = req.params;
	const data = req.body;
	const initialResult = await timeModel.getTimeById(id);
	if (initialResult.length > 0) {
		const results = timeModel.updateTime(id, data);
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

exports.deleteTime = async (req, res) => {
	const { id } = req.params;
	const initialResult = await timeModel.getTimeById(id);
	if (initialResult.length > 0) {
		const results = timeModel.deleteTimeById(id);
		if (results) {
			return res.json({
				status: true,
				message: "Data deleted successfully",
				results: initialResult[0],
			});
		}
	} else {
		return res.status(400).json({
			status: true,
			message: "Failed to delete data",
		});
	}
};

exports.detailTime = async (req, res) => {
	const { id } = req.params;
	const results = await timeModel.getTimeById(id);
	if (results.length > 0) {
		return res.json({
			status: true,
			message: "Details of time",
			results,
		});
	} else {
		return res.status(400).json({
			status: false,
			message: "time not exists",
		});
	}
};
