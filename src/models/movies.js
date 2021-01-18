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

exports.getMovieById = (id, cb) => {
	dbConn.query(`SELECT * FROM movies WHERE id=${id}`, (err, res, field) => {
		if (err) throw err;
		cb(res);
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
