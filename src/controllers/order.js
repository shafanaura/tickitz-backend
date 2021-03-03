const orderModel = require("../models/orders");
const transactionItemModel = require("../models/transactionItems");
const movieModel = require("../models/movies");
const cinemaModel = require("../models/cinemas");
const timeModel = require("../models/times");
const locationModel = require("../models/locations");
const seatModel = require("../models/seats");
const status = require("../helpers/Response");

exports.createOrder = async (req, res) => {
  const data = req.body;

  const resultsGetMovie = await movieModel.getMovieByIdWithItems(data.idMovie);
  if (resultsGetMovie.length < 1) {
    return status.ResponseStatus(res, 400, "Movie not exists");
  }

  const resultsGetCinema = await cinemaModel.getCinemaByIdWithTime(
    data.idCinema
  );
  if (resultsGetCinema.length < 1) {
    return status.ResponseStatus(res, 400, "Cinema not exists");
  }

  const resultsGetTime = await timeModel.getTimeById(data.idTime);
  if (resultsGetTime.length < 1) {
    return status.ResponseStatus(res, 400, "Time not exists");
  }

  const resultsGetLocation = await locationModel.getLocationById(
    data.idLocation
  );
  if (resultsGetLocation.length < 1) {
    return status.ResponseStatus(res, 400, "Location not exists");
  }
  const orderData = {
    idUser: req.userData.id,
    idMovie: data.idMovie,
    idCinema: data.idCinema,
    idTime: data.idTime,
    idLocation: data.idLocation,
    dateTime: data.dateTime,
    seatName: data.seatName,
  };
  const initialResult = await orderModel.createOrder(orderData);
  console.log(initialResult);
  if (initialResult.affectedRows > 0) {
    const resultsData = await orderModel.getTransactionByIdWithSeat(
      initialResult.insertId
    );
    console.log(resultsData);
    console.log(initialResult.insertId);
    if (resultsData.length > 0) {
      return status.ResponseStatus(res, 200, "Order successfully created", {
        // id: resultsData[0].id,
        user: resultsData[0].userName,
        movie: resultsData[0].title,
        cinema: resultsData[0].cinemaName,
        time: resultsData[0].timeName,
        location: resultsData[0].locationName,
        date: resultsData[0].dateTime,
        seat: resultsData[0].seatName,
        // price: resultsData[0].price * data.idSeat.length,
        // seats: resultsData.map((item) => item.seatName),
      });
    } else {
      return status.ResponseStatus(res, 400, "Failed to create order");
    }
  }
};
