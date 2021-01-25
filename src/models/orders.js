const dbConn = require("../helpers/db");

exports.createOrder = (data = {}) => {
	return new Promise((resolve, reject) => {
		dbConn.query(
			`INSERT INTO orders (${Object.keys(data).join()}) VALUES (${Object.values(
				data,
			)
				.map((item) => `"${item}"`)
				.join(",")})`,
			(err, res, field) => {
				if (err) reject(err);
				resolve(res);
			},
		);
	});
};

exports.checkMovie = (data) => {
	return new Promise((resolve, reject) => {
		dbConn.query(
			`SELECT * FROM movies 
      WHERE id IN (${data})`,
			(err, res, field) => {
				if (err) reject(err);
				resolve(res);
			},
		);
	});
};
