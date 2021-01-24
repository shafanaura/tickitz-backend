const dbConn = require("../helpers/db");

exports.createCinemaTimes = (data = {}, cb) => {
	dbConn.query(
		`INSERT INTO cinema_times (${Object.keys(
			data,
		).join()}) VALUES (${Object.values(data)
			.map((item) => `"${item}"`)
			.join(",")})`,
		(err, res, field) => {
			if (err) throw err;
			cb(res);
		},
	);
};

exports.createBulkCinemaTimes = async (id, data = []) => {
	return new Promise((resolve, reject) => {
		dbConn.query(
			`INSERT INTO cinema_times (idCinema, idTime) VALUES ${data
				.map((idTime) => `(${id}, ${idTime})`)
				.join()}`,
			(err, res, field) => {
				if (err) reject(err);
				resolve(res);
			},
		);
	});
};
