const dbConn = require("../helpers/db");
const table = "genres";

exports.createGenre = (data = {}) => {
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

exports.checkGenres = (data = []) => {
	return new Promise((resolve, reject) => {
		dbConn.query(
			`
    SELECT * FROM ${table}
    WHERE id IN (${data.map((item) => item).join()})
    `,
			(err, res, field) => {
				if (err) reject(err);
				resolve(res);
			},
		);
	});
};

exports.getGenreById = (id) => {
	return new Promise((resolve, reject) => {
		dbConn.query(`SELECT * FROM ${table} WHERE id=${id}`, (err, res, field) => {
			if (err) reject(err);
			resolve(res);
		});
	});
};

exports.getGenresByCondition = (cond) => {
	return new Promise((resolve, reject) => {
		dbConn.query(
			`SELECT * FROM ${table} WHERE name LIKE "%${cond.search}%"
    ORDER BY ${cond.sort} ${cond.order} 
    LIMIT ${cond.dataLimit} OFFSET ${cond.offset}`,
			(err, res, field) => {
				if (err) reject(err);
				resolve(res);
			},
		);
	});
};

exports.updateGenre = (id, data) => {
	return new Promise((resolve, reject) => {
		const key = Object.keys(data);
		const value = Object.values(data);
		dbConn.query(
			`
    UPDATE genres
    SET ${key.map((item, index) => `${item}="${value[index]}"`)}
    WHERE id=${id}
  `,
			(err, res, field) => {
				if (err) reject(err);
				resolve(res);
			},
		);
	});
};

exports.deleteGenreById = (id) => {
	return new Promise((resolve, reject) => {
		dbConn.query(`DELETE FROM ${table} WHERE id=${id}`, (err, res, field) => {
			if (err) reject(err);
			resolve(res);
		});
	});
};

exports.getGenreById = (id) => {
	return new Promise((resolve, reject) => {
		dbConn.query(`SELECT * FROM ${table} WHERE id=${id}`, (err, res, field) => {
			if (err) reject(err);
			resolve(res);
		});
	});
};

exports.getGenreCountByCondition = (cond) => {
	return new Promise((resolve, reject) => {
		dbConn.query(
			`
			SELECT COUNT(name) as totalData FROM
			${table} WHERE name LIKE "%${cond.search}%"
			ORDER BY ${cond.sort} ${cond.order}
			`,
			(err, res, field) => {
				if (err) reject(err);
				resolve(res);
			},
		);
	});
};
