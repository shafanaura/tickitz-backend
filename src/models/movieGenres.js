const dbConn = require("../helpers/db");
const table = "movie_genres";

exports.createMovieGenres = (data = {}, cb) => {
	dbConn.query(
		`INSERT INTO ${table} (${Object.keys(data).join()}) VALUES (${Object.values(
			data,
		)
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
			`INSERT INTO ${table} (idMovie, idGenre) VALUES ${data
				.map((idGenre) => `(${id}, ${idGenre})`)
				.join()}`,
			(err, res, field) => {
				if (err) reject(err);
				resolve(res);
			},
		);
	});
};

exports.updateGenreMovie = (id, data) => {
	return new Promise((resolve, reject) => {
		const key = Object.keys(data);
		const value = Object.values(data);
		dbConn.query(
			`UPDATE ${table}
			SET ${key.map((item, index) => `${item}="${value[index]}"`)}
			WHERE idMovie=${id}`,
			(err, res, field) => {
				if (err) reject(err);
				resolve(res);
			},
		);
	});
};
