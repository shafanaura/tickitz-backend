const dbConn = require("../helpers/db");
const table = "locations";

exports.createLocation = (data = {}) => {
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

exports.getLocationById = (id) => {
	return new Promise((resolve, reject) => {
		dbConn.query(`SELECT * FROM ${table} WHERE id=${id}`, (err, res, field) => {
			if (err) reject(err);
			resolve(res);
		});
	});
};

exports.getLocationCountByCondition = (cond) => {
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

exports.getLocationsByCondition = (cond) => {
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

exports.updateLocation = (id, data) => {
	return new Promise((resolve, reject) => {
		const key = Object.keys(data);
		const value = Object.values(data);
		dbConn.query(
			`
    UPDATE locations
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

exports.deleteLocationById = (id) => {
	return new Promise((resolve, reject) => {
		dbConn.query(`DELETE FROM ${table} WHERE id=${id}`, (err, res, field) => {
			if (err) reject(err);
			resolve(res);
		});
	});
};

exports.checkLocation = (data = []) => {
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
