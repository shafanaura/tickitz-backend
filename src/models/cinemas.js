const dbConn = require("../helpers/db");

exports.createCinema = (data = {}, cb) => {
	dbConn.query(
		`INSERT INTO cinemas (${Object.keys(data).join()}) VALUES (${Object.values(
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

exports.createCinemasAsync = (data = {}, cb) => {
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

exports.getCinemaByIdWithTimeAsync = (id, cb) => {
	return new Promise((resolve, reject) => {
		const query = dbConn.query(
			`
			SELECT c.id, c.name, c.address, c.price, t.name as timeName
			FROM cinemas c 
			INNER JOIN cinema_times ct ON c.id = ct.idCinema 
			INNER JOIN times t ON t.id = ct.idTime
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

exports.getCinemaById = (id, cb) => {
	dbConn.query(`SELECT * FROM cinemas WHERE id=${id}`, (err, res, field) => {
		if (err) throw err;
		cb(res);
	});
};

exports.deleteCinemaById = (id, cb) => {
	dbConn.query(`DELETE FROM cinemas WHERE id=${id}`, (err, res, field) => {
		if (err) throw err;
		cb(res);
	});
};

exports.getAllCinemas = (cb) => {
	dbConn.query(`SELECT * FROM cinemas`, (err, res, field) => {
		if (err) throw err;
		cb(res);
	});
};

exports.getCinemasByCondition = (cond, cb) => {
	dbConn.query(
		`SELECT * FROM cinemas WHERE name LIKE "%${cond.search}%"
    ORDER BY ${cond.sort} ${cond.order} 
    LIMIT ${cond.dataLimit} OFFSET ${cond.offset}`,
		(err, res, field) => {
			if (err) throw err;
			cb(res);
		},
	);
};

exports.updateCinema = (id, data, cb) => {
	const key = Object.keys(data);
	const value = Object.values(data);
	dbConn.query(
		`
    UPDATE cinemas
    SET ${key.map((item, index) => `${item}="${value[index]}"`)}
    WHERE id=${id}
  `,
		(err, res, field) => {
			if (err) throw err;
			cb(res);
		},
	);
};
