const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const { APP_PORT } = process.env;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(cors("*"));

app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
	return res.json({
		success: true,
		message: "Backend is running well",
	});
});

app.use(
	"/",
	require("./src/routes/movies"),
	require("./src/routes/cinemas"),
	require("./src/routes/genres"),
	require("./src/routes/auth"),
	require("./src/routes/times"),
);

app.listen(APP_PORT, () => {
	console.log(`App listening at http://localhost:${APP_PORT}`);
});
