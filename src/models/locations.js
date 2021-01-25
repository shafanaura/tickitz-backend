const dbConn = require("../helpers/db");

exports.createLocation = (data = {}) => {
	return new Promise((resolve, reject) => {
		dbConn.query(
			`INSERT INTO locations (${Object.keys(
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

// exports.checkGenres = (data = [], cb) => {
// 	const query = dbConn.query(
// 		`
//   SELECT * FROM genres
//   WHERE id IN (${data.map((item) => item).join()})
//   `,
// 		(err, res, field) => {
// 			if (err) throw err;
// 			console.log(field);
// 			cb(res);
// 		},
// 	);
// 	console.log(query.sql);
// };

// exports.checkGenresAsync = (data = [], cb) => {
// 	return new Promise((resolve, reject) => {
// 		const query = dbConn.query(
// 			`
//     SELECT * FROM genres
//     WHERE id IN (${data.map((item) => item).join()})
//     `,
// 			(err, res, field) => {
// 				if (err) reject(err);
// 				resolve(res);
// 			},
// 		);
// 		console.log(query.sql);
// 	});
// };

// exports.getGenreById = (id, cb) => {
// 	dbConn.query(`SELECT * FROM genres WHERE id=${id}`, (err, res, field) => {
// 		if (err) throw err;
// 		cb(res);
// 	});
// };

// exports.getGenresByCondition = (cond, cb) => {
// 	dbConn.query(
// 		`SELECT * FROM genres WHERE name LIKE "%${cond.search}%"
//     ORDER BY ${cond.sort} ${cond.order}
//     LIMIT ${cond.dataLimit} OFFSET ${cond.offset}`,
// 		(err, res, field) => {
// 			if (err) throw err;
// 			cb(res);
// 		},
// 	);
// };

// exports.updateGenre = (id, data, cb) => {
// 	const key = Object.keys(data);
// 	const value = Object.values(data);
// 	dbConn.query(
// 		`
//     UPDATE genres
//     SET ${key.map((item, index) => `${item}="${value[index]}"`)}
//     WHERE id=${id}
//   `,
// 		(err, res, field) => {
// 			if (err) throw err;
// 			cb(res);
// 		},
// 	);
// };

// exports.deleteGenreById = (id, cb) => {
// 	dbConn.query(`DELETE FROM genres WHERE id=${id}`, (err, res, field) => {
// 		if (err) throw err;
// 		cb(res);
// 	});
// };

exports.getLocationById = (id) => {
	return new Promise((resolve, reject) => {
		dbConn.query(
			`SELECT * FROM locations WHERE id=${id}`,
			(err, res, field) => {
				if (err) reject(err);
				resolve(res);
			},
		);
	});
};
