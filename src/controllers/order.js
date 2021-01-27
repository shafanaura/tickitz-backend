const orderModel = require("../models/orders");
const transactionItemModel = require("../models/transactionItems");
const movieModel = require("../models/movies");
const cinemaModel = require("../models/cinemas");
const timeModel = require("../models/times");
const locationModel = require("../models/locations");
const seatModel = require("../models/seats");

exports.createOrder = async (req, res) => {
	const data = req.body;
	const selectedSeat = [];
	const resultsGetMovie = await movieModel.getMovieByIdWithGenre(data.idMovie);
	if (resultsGetMovie.length < 1) {
		return res.status(400).json({
			status: false,
			message: "Movie not exist",
		});
	}
	const resultsGetCinema = await cinemaModel.getCinemaByIdWithTimeAsync(
		data.idCinema,
	);
	if (resultsGetCinema.length < 1) {
		return res.status(400).json({
			status: false,
			message: "Cinema not exist",
		});
	}
	const resultsGetTime = await timeModel.getTimeById(data.idTime);
	if (resultsGetTime.length < 1) {
		return res.status(400).json({
			status: false,
			message: "Time not exist",
		});
	}
	const resultsGetLocation = await locationModel.getLocationById(
		data.idLocation,
	);
	if (resultsGetLocation.length < 1) {
		return res.status(400).json({
			status: false,
			message: "Location not exist",
		});
	}
	if (typeof data.idSeat === "object") {
		const results = await seatModel.checkSeats(data.idSeat);
		if (results.length !== data.idSeat.length) {
			return res.status(400).json({
				status: false,
				message: "Some Seat are unavailable",
			});
		} else {
			results.forEach((item) => {
				selectedSeat.push(item.id);
			});
		}
	} else if (typeof data.idSeat === "string") {
		const results = await seatModel.checkSeats([data.idSeat]);
		if (results.length !== data.idSeat.length) {
			return res.status(400).json({
				status: false,
				message: "Some Seat are unavailable",
			});
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
			return res.json({
				status: true,
				message: "Order successfully created",
				results: {
					id: resultsData[0].id,
					idUser: resultsData[0].idUser,
					idMovie: resultsData[0].idMovie,
					idCinema: resultsData[0].idCinema,
					idTime: resultsData[0].idTime,
					idLocation: resultsData[0].idLocation,
					dateTime: resultsData[0].dateTime,
					seats: resultsData.map((item) => item.seatName),
				},
			});
		} else {
			return res.status(400).json({
				status: false,
				message: "Failed to create order",
			});
		}
	}
};
