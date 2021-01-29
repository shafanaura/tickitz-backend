const dbConn = require("../helpers/db");
const table = "transactions";

exports.createOrder = (data = {}) => {
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

exports.getTransactionByIdWithSeat = (id) => {
	return new Promise((resolve, reject) => {
		const query = dbConn.query(
			`
			SELECT users.email as userName, movies.title, cinemas.name as cinemaName, 
			times.name as timeName, locations.name as locationName, ts.dateTime, 
			seats.name as seatName, cinemas.price
			FROM ${table} ts 
			INNER JOIN users ON ts.idUser = users.id 
			INNER JOIN movies ON ts.idMovie = movies.id  
			INNER JOIN cinemas ON ts.idCinema = cinemas.id  
			INNER JOIN times ON ts.idTime = times.id  
			INNER JOIN locations ON ts.idLocation = locations.id
			INNER JOIN transaction_items ti ON ts.id = ti.idTransaction
			INNER JOIN seats ON seats.id = ti.idSeat  
			WHERE ts.id = ${id}
  		`,
			(err, res, field) => {
				if (err) reject(err);
				resolve(res);
			},
		);
		console.log(query.sql);
	});
};
