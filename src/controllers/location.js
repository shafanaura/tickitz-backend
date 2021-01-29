const locationModel = require("../models/locations");
const { APP_URL } = process.env;
const status = require("../helpers/Response");
const qs = require("querystring");

exports.createLocation = async (req, res) => {
	const data = req.body;
	const results = await locationModel.createLocation(data);
	if (results) {
		return status.ResponseStatus(res, 200, "Location created successfully", {
			id: results.insertId,
			...data,
		});
	}
};

exports.listLocations = async (req, res) => {
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

	const countData = await locationModel.getLocationCountByCondition(cond);
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
			? APP_URL.concat(`locations?${nextQuery}`)
			: null;
	pageInfo.prevLink =
		cond.page > 1 ? APP_URL.concat(`locations?${prevQuery}`) : null;

	const results = await locationModel.getLocationsByCondition(cond);
	if (results) {
		return status.ResponseStatus(
			res,
			200,
			"List of all locations",
			results,
			pageInfo,
		);
	}
};

exports.updateLocation = async (req, res) => {
	const { id } = req.params;
	const data = req.body;
	const initialResult = await locationModel.getLocationById(id);
	if (initialResult.length > 0) {
		const results = locationModel.updateLocation(id, data);
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

exports.deleteLocation = async (req, res) => {
	const { id } = req.params;
	const initialResult = await locationModel.getLocationById(id);
	if (initialResult.length > 0) {
		const results = locationModel.deleteLocationById(id);
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

exports.detailLocation = async (req, res) => {
	const { id } = req.params;
	const results = await locationModel.getLocationById(id);
	if (results.length > 0) {
		return status.ResponseStatus(res, 200, "Details of Location", results[0]);
	} else {
		return status.ResponseStatus(res, 400, "Location not exists");
	}
};
