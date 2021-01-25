const dbConn = require("../helpers/db");

exports.createCinemasAsync = (data = {}) => {
	return new Promise((resolve, reject) => {
		dbConn.query(
			`INSERT INTO cinemas (${Object.keys(
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

exports.getCinemaByIdWithTimeAsync = (id) => {
	return new Promise((resolve, reject) => {
		const query = dbConn.query(
			`
			SELECT c.id, c.name, c.picture, c.address, c.price, t.name as timeName
			FROM cinemas c 
			LEFT JOIN cinema_times ct ON c.id = ct.idCinema 
			LEFT JOIN times t ON t.id = ct.idTime
			WHERE c.id = ${id}
  		`,
			(err, res, field) => {
				if (err) reject(err);
				resolve(res);
			},
		);
		console.log(query.sql);
	});
};

exports.deleteCinemaById = (id, cb) => {
	dbConn.query(`DELETE FROM cinemas WHERE id=${id}`, (err, res, field) => {
		if (err) throw err;
		cb(res);
	});
};

exports.getCinemasByCondition = (cond) => {
	return new Promise((resolve, reject) => {
		dbConn.query(
			`SELECT c.id, c.name, c.picture, c.address, c.price
			FROM cinemas c
			WHERE c.name LIKE "%${cond.search}%"
			ORDER BY ${cond.sort} ${cond.order} 
			LIMIT ${cond.dataLimit} OFFSET ${cond.offset}`,
			(err, res, field) => {
				if (err) reject(err);
				resolve(res);
			},
		);
	});
};

exports.getCinemasCountByConditionAsync = (cond) => {
	return new Promise((resolve, reject) => {
		const query = dbConn.query(
			`
    SELECT COUNT(name) as totalData FROM
    cinemas WHERE name LIKE "%${cond.search}%"
    ORDER BY ${cond.sort} ${cond.order}
    `,
			(err, res, field) => {
				if (err) reject(err);
				resolve(res);
			},
		);
		console.log(query.sql);
	});
};

exports.updateCinema = (id, data) => {
	return new Promise((resolve, reject) => {
		const key = Object.keys(data);
		const value = Object.values(data);
		dbConn.query(
			`
    UPDATE cinemas
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

exports.getCinemaById = (id, cb) => {
	dbConn.query(`SELECT * FROM cinemas WHERE id=${id}`, (err, res, field) => {
		if (err) throw err;
		cb(res);
	});
};
