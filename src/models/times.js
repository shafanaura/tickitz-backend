const dbConn = require("../helpers/db");

exports.createTime = (data = {}, cb) => {
	const query = dbConn.query(
		`INSERT INTO times (${Object.keys(data).join()}) VALUES (${Object.values(
			data,
		)
			.map((item) => `"${item}"`)
			.join(",")})`,
		(err, res, field) => {
			if (err) throw err;
			cb(res);
		},
	);
	console.log(query.sql);
};

exports.checkTimes = (data = [], cb) => {
	const query = dbConn.query(
		`SELECT * FROM times WHERE id IN (${data.map((item) => item).join()})`,
		(err, res, field) => {
			if (err) throw err;
			console.log(field);
			cb(res);
		},
	);
	console.log(query.sql);
};

exports.checkTimesAsync = (data = [], cb) => {
	return new Promise((resolve, reject) => {
		const query = dbConn.query(
			`
    SELECT * FROM times
    WHERE id IN (${data.map((item) => item).join()})
    `,
			(err, res, field) => {
				if (err) reject(err);
				resolve(res);
			},
		);
		console.log(query.sql);
	});
};

exports.getTimeById = (id) => {
	return new Promise((resolve, reject) => {
		dbConn.query(`SELECT * FROM times WHERE id=${id}`, (err, res, field) => {
			if (err) reject(err);
			resolve(res);
		});
	});
};

exports.getTimesByCondition = (cond, cb) => {
	dbConn.query(
		`SELECT * FROM times WHERE time LIKE "%${cond.search}%"
    ORDER BY ${cond.sort} ${cond.order} 
    LIMIT ${cond.dataLimit} OFFSET ${cond.offset}`,
		(err, res, field) => {
			if (err) throw err;
			cb(res);
		},
	);
};

exports.updatetime = (id, data, cb) => {
	const key = Object.keys(data);
	const value = Object.values(data);
	dbConn.query(
		`
    UPDATE times
    SET ${key.map((item, index) => `${item}="${value[index]}"`)}
    WHERE id=${id}
  `,
		(err, res, field) => {
			if (err) throw err;
			cb(res);
		},
	);
};

exports.deleteTimeById = (id, cb) => {
	dbConn.query(`DELETE FROM times WHERE id=${id}`, (err, res, field) => {
		if (err) throw err;
		cb(res);
	});
};
