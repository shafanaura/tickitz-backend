const dbConn = require("../helpers/db");

exports.createMovie = (data = {}, cb) => {
	dbConn.query(
		`INSERT INTO movies (${Object.keys(data).join()}) VALUES (${Object.values(
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

exports.createMoviesAsync = (data = {}, cb) => {
	return new Promise((resolve, reject) => {
		dbConn.query(
			`INSERT INTO movies (${Object.keys(data).join()}) VALUES (${Object.values(
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

exports.getMovieById = (id, cb) => {
	dbConn.query(`SELECT * FROM movies WHERE id=${id}`, (err, res, field) => {
		if (err) throw err;
		cb(res);
	});
};

exports.getMovieByIdAsync = (id, cb) => {
	return new Promise((resolve, reject) => {
		const query = dbConn.query(
			`
    SELECT * FROM movies WHERE id=${id}
  `,
			(err, res, field) => {
				if (err) reject(err);
				resolve(res);
			},
		);
		console.log(query.sql);
	});
};

exports.getMovieByIdWithGenreAsync = (id, cb) => {
	return new Promise((resolve, reject) => {
		const query = dbConn.query(
			`
			SELECT m.id, m.title, g.genre as genreName
			FROM movies m 
			INNER JOIN movie_genres mg ON m.id = mg.idMovie 
			INNER JOIN genres g ON g.id = mg.idGenre
			WHERE m.id = ${id}
  		`,
			(err, res, field) => {
				if (err) reject(err);
				resolve(res);
			},
		);
		console.log(query.sql);
	});
};

exports.deleteMovieById = (id, cb) => {
	dbConn.query(`DELETE FROM movies WHERE id=${id}`, (err, res, field) => {
		if (err) throw err;
		cb(res);
	});
};

exports.getAllMovies = (cb) => {
	dbConn.query(`SELECT * FROM movies`, (err, res, field) => {
		if (err) throw err;
		cb(res);
	});
};

exports.getMoviesByCondition = (cond, cb) => {
	dbConn.query(
		`SELECT * FROM movies WHERE title LIKE "%${cond.search}%"
    ORDER BY ${cond.sort} ${cond.order} 
    LIMIT ${cond.dataLimit} OFFSET ${cond.offset}`,
		(err, res, field) => {
			if (err) throw err;
			cb(res);
		},
	);
};

exports.updateMovie = (id, data, cb) => {
	const key = Object.keys(data);
	const value = Object.values(data);
	dbConn.query(
		`
    UPDATE movies
    SET ${key.map((item, index) => `${item}="${value[index]}"`)}
    WHERE id=${id}
  `,
		(err, res, field) => {
			if (err) throw err;
			cb(res);
		},
	);
};
