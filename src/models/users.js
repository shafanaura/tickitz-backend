const dbConn = require("../helpers/db");

exports.getUsersByIdAsync = (id) => {
	return new Promise((resolve, reject) => {
		const query = dbConn.query(
			`SELECT * FROM users WHERE id=${id}`,
			(err, res, field) => {
				if (err) reject(err);
				resolve(res);
			},
		);
		console.log(query.sql);
	});
};

exports.getUsersByConditionAsync = (cond) => {
	return new Promise((resolve, reject) => {
		const query = dbConn.query(
			`SELECT * FROM users WHERE ${Object.keys(cond)
				.map((item) => `${item}="${cond[item]}"`)
				.join(" AND ")}`,
			(err, res, field) => {
				if (err) reject(err);
				resolve(res);
			},
		);
		console.log(query.sql);
	});
};

exports.createUser = (data) => {
	return new Promise((resolve, reject) => {
		dbConn.query(
			`INSERT INTO users (${Object.keys(data).join()}) VALUES (${Object.values(
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
