const orderModel = require("../models/orders");
const movieModel = require("../models/movies");
const cinemaModel = require("../models/cinemas");
const timeModel = require("../models/times");
const locationModel = require("../models/locations");
const seatModel = require("../models/seats");

exports.createOrder = async (req, res) => {
	const data = req.body;
	const resultsGetMovie = await movieModel.getMovieByIdWithGenre(data.id_movie);
	if (resultsGetMovie.length < 1) {
		return res.status(400).json({
			status: false,
			message: "Movie not exist",
		});
	}
	const resultsGetCinema = await cinemaModel.getCinemaByIdWithTimeAsync(
		data.id_cinema,
	);
	if (resultsGetCinema.length < 1) {
		return res.status(400).json({
			status: false,
			message: "Cinema not exist",
		});
	}
	const resultsGetTime = await timeModel.getTimeById(data.id_time);
	if (resultsGetTime.length < 1) {
		return res.status(400).json({
			status: false,
			message: "Time not exist",
		});
	}
	const resultsGetLocation = await locationModel.getLocationById(
		data.id_location,
	);
	if (resultsGetLocation.length < 1) {
		return res.status(400).json({
			status: false,
			message: "Location not exist",
		});
	}
	const resultsGetSeat = await seatModel.getSeatById(data.id_seat);
	if (resultsGetSeat.length < 1) {
		return res.status(400).json({
			status: false,
			message: "Seat not exist",
		});
	}
	const orderData = {
		user: req.userData.id,
		movie: data.id_movie,
	};
};
