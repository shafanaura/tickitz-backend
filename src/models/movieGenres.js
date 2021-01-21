const dbConn = require("../helpers/db");

exports.createMovieGenres = (data = {}, cb) => {
	dbConn.query(
		`INSERT INTO movie_genres (${Object.keys(
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

exports.createBulkMovieGenres = async (id, data = []) => {
	return new Promise((resolve, reject) => {
		dbConn.query(
			`INSERT INTO movie_genres (idMovie, idGenre) VALUES ${data
				.map((idGenre) => `(${id}, ${idGenre})`)
				.join()}`,
			(err, res, field) => {
				if (err) reject(err);
				resolve(res);
			},
		);
	});
};
