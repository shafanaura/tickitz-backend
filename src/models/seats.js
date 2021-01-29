const dbConn = require("../helpers/db");
const table = "seats";

exports.createSeat = (data = {}) => {
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

exports.checkSeats = (data = []) => {
	return new Promise((resolve, reject) => {
		const query = dbConn.query(
			`
    SELECT * FROM ${table}
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

exports.getSeatById = (id) => {
	return new Promise((resolve, reject) => {
		dbConn.query(`SELECT * FROM ${table} WHERE id=${id}`, (err, res, field) => {
			if (err) reject(err);
			resolve(res);
		});
	});
};

exports.getSeatCountByConditionAsync = (cond) => {
	return new Promise((resolve, reject) => {
		const query = dbConn.query(
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
		console.log(query.sql);
	});
};

exports.getSeatsByCondition = (cond) => {
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

exports.updateSeat = (id, data) => {
	return new Promise((resolve, reject) => {
		const key = Object.keys(data);
		const value = Object.values(data);
		dbConn.query(
			`
    UPDATE seats
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

exports.deleteSeatById = (id) => {
	return new Promise((resolve, reject) => {
		dbConn.query(`DELETE FROM ${table} WHERE id=${id}`, (err, res, field) => {
			if (err) reject(err);
			resolve(res);
		});
	});
};
