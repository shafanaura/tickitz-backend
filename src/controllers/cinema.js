const cinemaModel = require("../models/cinemas");
const timeModel = require("../models/times");
const multer = require("multer");
const qs = require("querystring");
const status = require("../helpers/Response");
const { APP_URL } = process.env;

exports.createCinema = async (req, res) => {
  const data = req.body;
  const selectedTime = [];
  if (typeof data.idTime === "object") {
    const results = await timeModel.checkTimes(data.idTime);
    if (results.length !== data.idTime.length) {
      return status.ResponseStatus(res, 400, "Some Time are unavailable");
    } else {
      results.forEach((item) => {
        selectedTime.push(item.id);
      });
    }
  } else if (typeof data.idTime === "string") {
    const results = await timeModel.checkTimes([data.idTime]);
    if (results.length !== data.idTime.length) {
      return status.ResponseStatus(res, 400, "Some Time are unavailable");
    } else {
      results.forEach((item) => {
        selectedTime.push(item.id);
      });
    }
  }
  const cinemaData = {
    name: data.name,
    picture: `${APP_URL}${req.file.destination}/${req.file.filename}` || null,
    address: data.address,
    price: data.price,
    // createdBy: req.userData.id,
  };
  const initialResult = await cinemaModel.createCinemas(cinemaData);
  if (initialResult.affectedRows > 0) {
    const cinemas = await cinemaModel.getCinemaByIdWithTime(
      initialResult.insertId
    );
    if (cinemas.length > 0) {
      return status.ResponseStatus(res, 200, "Cinema successfully created", {
        id: cinemas[0].id,
        name: cinemas[0].name,
        picture: cinemas[0].picture,
        address: cinemas[0].address,
        price: cinemas[0].price,
        timeName: cinemas.map((item) => item.timeName),
      });
    } else {
      return status.ResponseStatus(res, 400, "Failed ro create cinema");
    }
  }
};

exports.detailCinema = async (req, res) => {
  const { id } = req.params;
  const results = await cinemaModel.getCinemaByIdWithTime(id);
  if (results.length > 0) {
    return status.ResponseStatus(res, 200, "Details of cinema", {
      id: results[0].id,
      name: results[0].name,
      picture: results[0].picture,
      address: results[0].address,
      price: results[0].price,
      timeName: results.map(({ timeName }) => timeName),
    });
  } else {
    return status.ResponseStatus(res, 400, "Cinema not exists");
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

  const countData = await cinemaModel.getCinemasCountByCondition(cond);
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
    return status.ResponseStatus(
      res,
      200,
      "List of all cinemas",
      results,
      pageInfo
    );
  }
};

exports.deleteCinema = async (req, res) => {
  const { id } = req.params;
  const initialResult = await cinemaModel.getCinemaById(id);
  if (initialResult.length > 0) {
    const results = await cinemaModel.deleteCinemaById(id);
    if (results) {
      return status.ResponseStatus(
        res,
        200,
        "Data deleted successfully",
        initialResult[0]
      );
    }
  } else {
    return status.ResponseStatus(res, 400, "Failed to delete data");
  }
};

exports.updateCinema = async (req, res) => {
  try {
    const { id } = req.params;
    const { ...data } = req.body;
    const initialResult = await cinemaModel.getCinemaById(id);
    if (initialResult.length < 1) {
      return status.ResponseStatus(res, 404, "Cinema not found");
    }

    if (req.file) {
      const picture = `${APP_URL}${req.file.destination}/${req.file.filename}`;
      const uploadImage = await cinemaModel.updateCinema(id, { picture });
      if (uploadImage.affectedRows > 0) {
        // if (initialResult[0].picture !== null) {
        //   fs.unlinkSync(`uploads/movie/${initialResult[0].picture}`);
        // }
        return status.ResponseStatus(res, 200, "Image hash been Updated");
      }
      return status.ResponseStatus(res, 400, "Can't update Image");
    }

    const finalResult = await cinemaModel.updateCinema(id, data);
    if (finalResult.affectedRows > 0) {
      return status.ResponseStatus(res, 200, "data successfully updated", {
        ...initialResult[0],
        ...data,
      });
    }
    return status.ResponseStatus(res, 400, "Failed to update data");
  } catch (err) {
    console.log(err);
    return status.ResponseStatus(res, 400, "Bad Request");
  }
};
