const dbConn = require("../helpers/db");

exports.createTransactionItems = (data = {}, cb) => {
	dbConn.query(
		`INSERT INTO transaction_items (${Object.keys(
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

exports.createBulkTransactionItems = async (id, data = []) => {
	return new Promise((resolve, reject) => {
		dbConn.query(
			`INSERT INTO transaction_items (idTransaction, idSeat) VALUES ${data
				.map((idSeat) => `(${id}, ${idSeat})`)
				.join()}`,
			(err, res, field) => {
				if (err) reject(err);
				resolve(res);
			},
		);
	});
};
