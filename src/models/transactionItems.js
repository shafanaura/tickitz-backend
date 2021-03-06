const dbConn = require("../helpers/db");
const table = "transaction_seat_items";

exports.createTransactionItems = (data = {}, cb) => {
  dbConn.query(
    `INSERT INTO ${table} (${Object.keys(data).join()}) VALUES (${Object.values(
      data
    )
      .map((item) => `"${item}"`)
      .join(",")})`,
    (err, res, field) => {
      if (err) throw err;
      cb(res);
    }
  );
};

exports.createBulkTransactionItems = async (id, data = []) => {
  return new Promise((resolve, reject) => {
    dbConn.query(
      `INSERT INTO ${table} (idTransaction, seatName) VALUES ${data
        .map((seatName) => `(${id}, ${seatName})`)
        .join()}`,
      (err, res, field) => {
        if (err) reject(err);
        resolve(res);
      }
    );
  });
};
