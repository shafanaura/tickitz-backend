const dbConn = require("../helpers/db");

exports.createOrder = (data = {}) => {
	return new Promise((resolve, reject) => {
		dbConn.query(
			`INSERT INTO transactions (${Object.keys(
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
			SELECT ts.id, ts.idUser, ts.idMovie, ts.idCinema, ts.idTime, ts.idLocation, ts.dateTime, seats.name as seatName
			FROM transactions ts 
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
