const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "uploads/cinema");
	},
	filename: (req, file, cb) => {
		console.log(file);
		const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
		cb(
			null,
			file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname),
		);
	},
});

module.exports = multer({ storage });
