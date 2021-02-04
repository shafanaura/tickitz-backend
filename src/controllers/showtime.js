const movieModel = require("../models/movies");
const cinemaModel = require("../models/cinemas");
const timeModel = require("../models/times");
const locationModel = require("../models/locations");
const showtimeModel = require("../models/showtimes");
const status = require("../helpers/Response");

exports.createShowtime = async (req, res) => {
	const data = req.body;
	const selectedMovie = [];
	const selectedLocation = [];
	const selectedCinema = [];
	const selectedTime = [];
	// get location
	if (typeof data.idMovie === "object") {
		const results = await movieModel.checkMovie(data.idMovie);
		if (results.length !== data.idMovie.length) {
			return status.ResponseStatus(res, 400, "Some movie not exists");
		} else {
			results.forEach((item) => {
				selectedMovie.push(item.id);
			});
		}
	} else if (typeof data.idMovie === "string") {
		const results = await movieModel.checkMovie([data.idMovie]);
		if (results.length !== data.idMovie.length) {
			return status.ResponseStatus(res, 400, "Some movie not exists");
		} else {
			results.forEach((item) => {
				selectedMovie.push(item.id);
			});
		}
	}
	// get location
	if (typeof data.idLocation === "object") {
		const results = await locationModel.checkLocation(data.idLocation);
		if (results.length !== data.idLocation.length) {
			return status.ResponseStatus(res, 400, "Some location not exists");
		} else {
			results.forEach((item) => {
				selectedLocation.push(item.id);
			});
		}
	} else if (typeof data.idLocation === "string") {
		const results = await locationModel.checkLocation([data.idLocation]);
		if (results.length !== data.idLocation.length) {
			return status.ResponseStatus(res, 400, "Some location not exists");
		} else {
			results.forEach((item) => {
				selectedLocation.push(item.id);
			});
		}
	}
	// get cinema
	if (typeof data.idCinema === "object") {
		const results = await cinemaModel.checkCinema(data.idCinema);
		if (results.length !== data.idCinema.length) {
			return status.ResponseStatus(res, 400, "Some cinema not exists");
		} else {
			results.forEach((item) => {
				selectedCinema.push(item.id);
			});
		}
	} else if (typeof data.idCinema === "string") {
		const results = await cinemaModel.checkCinema([data.idCinema]);
		if (results.length !== data.idCinema.length) {
			return status.ResponseStatus(res, 400, "Some cinema not exists");
		} else {
			results.forEach((item) => {
				selectedCinema.push(item.id);
			});
		}
	}
	// get time
	if (typeof data.idTime === "object") {
		const results = await timeModel.checkTime(data.idTime);
		if (results.length !== data.idTime.length) {
			return status.ResponseStatus(res, 400, "Some time not exists");
		} else {
			results.forEach((item) => {
				selectedTime.push(item.id);
			});
		}
	} else if (typeof data.idTime === "string") {
		const results = await timeModel.checkTime([data.idTime]);
		if (results.length !== data.idTime.length) {
			return status.ResponseStatus(res, 400, "Some time not exists");
		} else {
			results.forEach((item) => {
				selectedTime.push(item.id);
			});
		}
	}
	const showtimeData = {
		showTimeDate: data.showTimeDate,
		idMovie: data.idMovie,
		idLocation: data.idLocation,
		idCinema: data.idCinema,
		idTime: data.idTime,
	};
	if (showtimeData) {
		console.log("Berhasil");
	}
	// const initialResult = await showtimeModel.createShowtime(showtimeData);
	// if (initialResult.affectedRows > 0) {
	// 	const resultsData = await showtimeModel.getShowtimeById(
	// 		initialResult.insertId,
	// 	);
	// 	if (resultsData.length > 0) {
	// 		return status.ResponseStatus(res, 200, "Order successfully created", {
	// 			// id: resultsData[0].id,
	// 			// user: resultsData[0].userName,
	// 			// movie: resultsData[0].title,
	// 			// cinema: resultsData[0].cinemaName,
	// 			// time: resultsData[0].timeName,
	// 			// location: resultsData[0].locationName,
	// 			// date: resultsData[0].dateTime,
	// 		});
	// 	} else {
	// 		return status.ResponseStatus(res, 400, "Failed to create order");
	// 	}
	// }
};

exports.listShowtime = async (req, res) => {
	const cond = { ...req.query };
	cond.date = cond.date || "";
	cond.location = cond.location || "";
	cond.movie = cond.movie || "";

	// const obj1 = {
	// 	name: "server1",
	// 	type: "http",
	// 	port: "8080",
	// };

	// const obj2 = {
	// 	name: "server2",
	// 	type: "https",
	// 	port: "8443",
	// };

	// const obj3 = {
	// 	name: "server3",
	// 	type: "http",
	// 	port: "80",
	// };

	// // Place objects in an array (as interm step)
	// const array = [obj1, obj2, obj3];

	const resultGetTimes = await showtimeModel.getShowtimeByCondition(cond);
	let output = {};
	resultGetTimes.forEach((item) => {
		// the item does not exists, we create it.
		if (!output[item.cinemaName]) {
			output[item.cinemaName] = {
				cinema: item.cinemaName,
				picture: item.cinemaPicture,
				address: item.cinemaAddress,
				price: item.cinemaPrice,
				value: [],
			};
		}
		// in either case, we push the current item in the value.
		// of the current output key.
		output[item.cinemaName].value.push(item.timeName);
	});

	// we are using Object.values() because we do not want the keys
	// used to generate the output.
	const results = Object.values(output);

	// const arr = resultGetTimes.reduce((r, item) => {
	// 	r[item.cinemaName] = r[item.cinemaName] || [];
	// 	r[item.cinemaName].push(item.timeName);
	// 	return r;
	// }, {});
	// const results = Object.keys(arr).map((key) => ({
	// 	cinemaName: key,
	// 	timeName: arr[key],
	// }));
	console.log(results);
	if (results) {
		return status.ResponseStatus(res, 200, "List of all showtime", results);
	}
};

exports.listLocDate = async (req, res) => {
	const { id } = req.params;

	const results = await showtimeModel.getLocDate(id);
	if (results) {
		return status.ResponseStatus(
			res,
			200,
			"List of all location and date",
			results,
		);
	}
};
