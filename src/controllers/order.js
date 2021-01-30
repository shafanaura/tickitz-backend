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
	const selectedSeat = [];
	const resultsGetMovie = await movieModel.getMovieByIdWithGenre(data.idMovie);
	if (resultsGetMovie.length < 1) {
		return status.ResponseStatus(res, 400, "Movie not exists");
	}
	const resultsGetCinema = await cinemaModel.getCinemaByIdWithTimeAsync(
		data.idCinema,
	);
	if (resultsGetCinema.length < 1) {
		return status.ResponseStatus(res, 400, "Cinema not exists");
	}
	const resultsGetTime = await timeModel.getTimeById(data.idTime);
	if (resultsGetTime.length < 1) {
		return status.ResponseStatus(res, 400, "Time not exists");
	}
	const resultsGetLocation = await locationModel.getLocationById(
		data.idLocation,
	);
	if (resultsGetLocation.length < 1) {
		return status.ResponseStatus(res, 400, "Location not exists");
	}
	if (typeof data.idSeat === "object") {
		const results = await seatModel.checkSeats(data.idSeat);
		if (results.length !== data.idSeat.length) {
			return status.ResponseStatus(res, 400, "Some seat not exists");
		} else {
			results.forEach((item) => {
				selectedSeat.push(item.id);
			});
		}
	} else if (typeof data.idSeat === "string") {
		const results = await seatModel.checkSeats([data.idSeat]);
		if (results.length !== data.idSeat.length) {
			return status.ResponseStatus(res, 400, "Some seat not exists");
		} else {
			results.forEach((item) => {
				selectedSeat.push(item.id);
			});
		}
	}
	const orderData = {
		idUser: req.userData.id,
		idMovie: data.idMovie,
		idCinema: data.idCinema,
		idTime: data.idTime,
		idLocation: data.idLocation,
		dateTime: data.dateTime,
	};
	const initialResult = await orderModel.createOrder(orderData);
	if (initialResult.affectedRows > 0) {
		if (selectedSeat.length > 0) {
			await transactionItemModel.createBulkTransactionItems(
				initialResult.insertId,
				selectedSeat,
			);
		}
		const resultsData = await orderModel.getTransactionByIdWithSeat(
			initialResult.insertId,
		);
		if (resultsData.length > 0) {
			return status.ResponseStatus(res, 200, "Order successfully created", {
				id: resultsData[0].id,
				user: resultsData[0].userName,
				movie: resultsData[0].title,
				cinema: resultsData[0].cinemaName,
				time: resultsData[0].timeName,
				location: resultsData[0].locationName,
				date: resultsData[0].dateTime,
				price: resultsData[0].price * data.idSeat.length,
				seats: resultsData.map((item) => item.seatName),
			});
		} else {
			return status.ResponseStatus(res, 400, "Failed to create order");
		}
	}
};
