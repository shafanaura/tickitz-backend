const dbConn = require("../helpers/db");
const table = "cinema_times";

exports.createCinemaTimes = (data = {}) => {
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

exports.createBulkCinemaTimes = async (id, data = []) => {
	return new Promise((resolve, reject) => {
		dbConn.query(
			`INSERT INTO ${table} (idCinema, idTime) VALUES ${data
				.map((idTime) => `(${id}, ${idTime})`)
				.join()}`,
			(err, res, field) => {
				if (err) reject(err);
				resolve(res);
			},
		);
	});
};
