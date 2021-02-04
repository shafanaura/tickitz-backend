const dbConn = require("../helpers/db");
const table = "showtimes";

exports.createShowtime = async (data = {}) => {
	return new Promise((resolve, reject) => {
		dbConn.query(
			`INSERT INTO ${table} (${Object.keys(
				data,
			).join()}) VALUES (${Object.values(data)
				.map((item) => `"${item}"`)
				.join(",")})`,
			(err, res, field) => {
				if (err) reject(err);
				resolve(res);
			},
		);
	});
};

exports.createBulkShowtime = async (id, data = []) => {
	return new Promise((resolve, reject) => {
		dbConn.query(
			`INSERT INTO ${table} (idMovie, idSeat) VALUES ${data
				.map((idSeat) => `(${id}, ${idSeat})`)
				.join()}`,
			(err, res, field) => {
				if (err) reject(err);
				resolve(res);
			},
		);
	});
};

exports.getShowtimeByCondition = (cond) => {
	return new Promise((resolve, reject) => {
		dbConn.query(
			`
			SELECT cinemas.name as cinemaName, times.name as timeName FROM ${table}
			INNER JOIN cinemas ON cinemas.id = ${table}.idCinema
			INNER JOIN times ON times.id = ${table}.idTime
			WHERE showTimeDate LIKE "${cond.date}"
			OR idLocation LIKE "${cond.location}"
			OR idMovie LIKE "${cond.movie}"
			`,
			(err, res, field) => {
				if (err) reject(err);
				resolve(res);
			},
		);
	});
};
