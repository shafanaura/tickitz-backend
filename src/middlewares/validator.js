const { body, validationResult } = require("express-validator");

module.exports = {
	movieInfo: [
		body("title", "Please insert min 3 character").isLength({ min: 3 }),
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
