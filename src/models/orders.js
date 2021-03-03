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
      cinemas.name as cinemaName, ts.dateTime,
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
