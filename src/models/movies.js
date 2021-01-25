const dbConn = require("../helpers/db");

exports.createMovie = (data = {}, cb) => {
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

exports.getMovieByIdWithGenre = (id) => {
	return new Promise((resolve, reject) => {
		const query = dbConn.query(
			`
			SELECT m.id, m.title, m.releaseDate, m.directed, m.duration, m.cast, m.synopsis, g.name as genre
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

exports.getMoviesCountByConditionAsync = (cond) => {
	return new Promise((resolve, reject) => {
		const query = dbConn.query(
			`
    SELECT COUNT(title) as totalData FROM
    movies WHERE title LIKE "%${cond.search}%"
    ORDER BY ${cond.sort} ${cond.order}
    `,
			(err, res, field) => {
				if (err) reject(err);
				// console.log(field)
				resolve(res);
			},
		);
		console.log(query.sql);
	});
};

exports.deleteMovieById = (id) => {
	return new Promise((resolve, reject) => {
		dbConn.query(`DELETE FROM movies WHERE id=${id}`, (err, res, field) => {
			if (err) reject(err);
			resolve(res);
		});
	});
};

exports.getMoviesByCondition = (cond) => {
	return new Promise((resolve, reject) => {
		dbConn.query(
			`SELECT m.id, m.title FROM movies m 
			INNER JOIN movie_genres mg ON m.id = mg.idMovie 
			INNER JOIN genres g ON g.id = mg.idGenre 
			WHERE m.title LIKE "%${cond.search}%"
			ORDER BY ${cond.sort} ${cond.order} 
			LIMIT ${cond.dataLimit} OFFSET ${cond.offset}`,
			(err, res, field) => {
				if (err) reject(err);
				resolve(res);
			},
		);
	});
};

exports.updateMovie = (id, data) => {
	return new Promise((resolve, reject) => {
		const key = Object.keys(data);
		const value = Object.values(data);
		dbConn.query(
			`UPDATE movies
			SET ${key.map((item, index) => `${item}="${value[index]}"`)}
			WHERE id=${id}`,
			(err, res, field) => {
				if (err) reject(err);
				resolve(res);
			},
		);
	});
};

// exports.updateGenreInMovie = (id, data) => {
// 	return new Promise((resolve, reject) => {
// 		dbConn.query(
// 			`UPDATE movies SET genre = "${data.join(", ")}" WHERE id=${id}`,
// 			(err, res, field) => {
// 				if (err) reject(err);
// 				resolve(res);
// 			},
// 		);
// 	});
// };
