const dbConn = require("../helpers/db");
const table = "cinemas";

exports.createCinemas = (data = {}) => {
  return new Promise((resolve, reject) => {
    dbConn.query(
      `INSERT INTO ${table} (${Object.keys(
        data
      ).join()}) VALUES (${Object.values(data)
        .map((item) => `"${item}"`)
        .join(",")})`,
      (err, res, field) => {
        if (err) reject(err);
        resolve(res);
      }
    );
  });
};

exports.getCinemaByIdWithTime = (id) => {
  return new Promise((resolve, reject) => {
    const query = dbConn.query(
      `
			SELECT c.id, c.name, c.picture, c.address, c.price 
			FROM ${table} c
			WHERE c.id = ${id}
  		`,
      (err, res, field) => {
        if (err) reject(err);
        resolve(res);
      }
    );
    console.log(query.sql);
  });
};

exports.deleteCinemaById = (id) => {
  return new Promise((resolve, reject) => {
    dbConn.query(`DELETE FROM ${table} WHERE id=${id}`, (err, res, field) => {
      if (err) reject(err);
      resolve(res);
    });
  });
};

exports.getCinemasByCondition = (cond) => {
  return new Promise((resolve, reject) => {
    dbConn.query(
      `SELECT c.id, c.name, c.picture, c.address, c.price
			FROM ${table} c
			WHERE c.name LIKE "%${cond.search}%"
			ORDER BY ${cond.sort} ${cond.order} 
			LIMIT ${cond.dataLimit} OFFSET ${cond.offset}`,
      (err, res, field) => {
        if (err) reject(err);
        resolve(res);
      }
    );
  });
};

exports.getCinemasCountByCondition = (cond) => {
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
      }
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
    UPDATE ${table}
    SET ${key.map((item, index) => `${item}="${value[index]}"`)}
    WHERE id=${id}
  `,
      (err, res, field) => {
        if (err) reject(err);
        resolve(res);
      }
    );
  });
};

exports.getCinemaById = (id) => {
  return new Promise((resolve, reject) => {
    dbConn.query(`SELECT * FROM cinemas WHERE id=${id}`, (err, res, field) => {
      if (err) reject(err);
      resolve(res);
    });
  });
};

exports.checkCinema = (data = []) => {
  return new Promise((resolve, reject) => {
    dbConn.query(
      `
    SELECT * FROM ${table}
    WHERE id IN (${data.map((item) => item).join()})
    `,
      (err, res, field) => {
        if (err) reject(err);
        resolve(res);
      }
    );
  });
};
