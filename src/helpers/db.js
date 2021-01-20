const mysql = require("mysql");
const { DB_HOST, DB_NAME, DB_USER, DB_PASSWORD } = process.env;

const dbConn = mysql.createConnection({
	host: DB_HOST,
	database: DB_NAME,
	user: DB_USER,
	password: DB_PASSWORD,
});

dbConn.connect(function (error) {
	if (!error) {
		console.log("Database Connected!");
	} else {
		console.log("Database is not Connected!");
	}
});

module.exports = dbConn;
