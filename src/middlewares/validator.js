const { check, body, validationResult } = require("express-validator");
const dbConn = require("../helpers/db");

module.exports = {
	movieInfo: [
		body("title").custom((value, { req }) => {
			return new Promise((resolve, reject) => {
				dbConn.query(
					`SELECT id FROM movies WHERE title = ?`,
					req.body.title,
					(err, res) => {
						if (err) {
							reject(new Error("Server Error"));
						}
						if (res.length > 0) {
							reject(new Error(`${req.body.title} already in use`));
						}

						resolve(true);
					},
				);
			});
		}),
	],
	genreInfo: [
		body("genre", "Please insert min 3 character").isLength({ min: 3 }),
	],
	// Checking Validation Result
	result: (req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array() });
		}
		next();
	},
};
