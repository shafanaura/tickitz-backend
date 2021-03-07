const dbConn = require("../helpers/db");
const table = "transactions";

exports.createOrder = (data = {}) => {
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

exports.getTransactionByIdWithSeat = (id) => {
  return new Promise((resolve, reject) => {
    const query = dbConn.query(
      `
			SELECT users.email as userName, 
      movies.title, times.name as timeName,
      cinemas.name as cinemaName, cinemas.price as cinemaPrice,
      ts.dateTime, ts.price,
      locations.name as locationName, ts.seatName
			FROM ${table} ts 
			INNER JOIN users ON users.id = ts.idUser  
			INNER JOIN movies ON movies.id = ts.idMovie   
			INNER JOIN cinemas ON cinemas.id = ts.idCinema
      INNER JOIN times ON times.id = ts.idTime 
      INNER JOIN locations ON locations.id = ts.idLocation 
			WHERE ts.id = ${id}
  		`,
      (err, res, field) => {
        if (err) reject(err);
        resolve(res);
      }
    );
    console.log(query.sql);
  });
};

exports.getTransactionByUserId = async (id) => {
  return new Promise((resolve, reject) => {
    dbConn.query(
      `
    SELECT t.id, cinemas.name as cinema, cinemas.picture as picture, movies.title as movie,
    t.dateTime, times.name as time
    FROM ${table} t
    INNER JOIN movies ON t.idMovie = movies.id
    INNER JOIN cinemas ON t.idCinema = cinemas.id
    INNER JOIN times ON t.idTime = times.id
    WHERE t.idUser=${id}
    `,
      (err, res, field) => {
        if (err) reject(err);
        resolve(res);
      }
    );
  });
};

exports.getOrderCountByConditionAsync = (cond) => {
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

exports.getOrderByCondition = (cond) => {
  return new Promise((resolve, reject) => {
    dbConn.query(
      `SELECT * FROM ${table} WHERE name LIKE "%${cond.search}%"
    ORDER BY ${cond.sort} ${cond.order} 
    LIMIT ${cond.dataLimit} OFFSET ${cond.offset}`,
      (err, res, field) => {
        if (err) reject(err);
        resolve(res);
      }
    );
  });
};
