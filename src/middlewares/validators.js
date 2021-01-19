const dbConn = require("../helpers/db");
const { body, param, validationResult } = require("express-validator");

module.exports = {
	userInfo: [
		body("title", "Invalid email address")
			.optional()
			.isLength({ min: 3 })
			.trim()
			.unescape()
			.escape()
			.custom(async (value) => {
				// Checking that the email already in use or NOT
				const [
					row,
				] = await dbConn.execute(
					"SELECT `title` FROM `movies` WHERE `title` =?",
					[value],
				);
				if (row.length > 0) {
					return Promise.reject("E-mail already in use");
				}
			}),
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
