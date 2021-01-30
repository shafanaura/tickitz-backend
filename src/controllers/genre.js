const genreModel = require("../models/genres");
const status = require("../helpers/Response");
const { APP_URL } = process.env;
const qs = require("querystring");

exports.createGenre = async (req, res) => {
	const data = req.body;
	const results = await genreModel.createGenre(data);
	if (results) {
		return status.ResponseStatus(res, 200, "Genre created successfully", {
			id: results.insertId,
			...data,
		});
	}
};

exports.listGenres = async (req, res) => {
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

	const countData = await genreModel.getGenreCountByCondition(cond);
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
			? APP_URL.concat(`genres?${nextQuery}`)
			: null;
	pageInfo.prevLink =
		cond.page > 1 ? APP_URL.concat(`genres?${prevQuery}`) : null;

	const results = await genreModel.getGenresByCondition(cond);
	if (results) {
		return status.ResponseStatus(
			res,
			200,
			"List of all Genres",
			results,
			pageInfo,
		);
	}
};

exports.updateGenre = async (req, res) => {
	const { id } = req.params;
	const data = req.body;
	const initialResult = await genreModel.getGenreById(id);
	if (initialResult.length > 0) {
		const results = await genreModel.updateGenre(id, data);
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

exports.deleteGenre = async (req, res) => {
	const { id } = req.params;
	const initialResult = await genreModel.getGenreById(id);
	if (initialResult.length > 0) {
		const results = await genreModel.deleteGenreById(id);
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

exports.detailGenre = async (req, res) => {
	const { id } = req.params;
	const results = await genreModel.getGenreById(id);
	if (results.length > 0) {
		return status.ResponseStatus(res, 200, "Details of Genre", results[0]);
	} else {
		return status.ResponseStatus(res, 400, "Genre not exists");
	}
};
