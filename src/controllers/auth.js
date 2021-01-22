const userModel = require("../models/users");
const bcrypt = require("bcrypt");
const { APP_KEY } = process.env;
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
	const { username, password } = req.body;
	const existingUser = await userModel.getUsersByConditionAsync({ username });
	if (existingUser.length > 0) {
		const compare = await bcrypt.compare(password, existingUser[0].password);
		if (compare) {
			const { id } = existingUser[0];
			const token = jwt.sign({ id }, APP_KEY);
			return res.json({
				status: true,
				message: "Login successfully",
				token,
				results: existingUser[0],
			});
		}
	}
	return res.status(401).json({
		status: false,
		message: "Wrong username or password",
	});
};

exports.register = async (req, res) => {
	const { username, password } = req.body;
	const isExist = await userModel.getUsersByConditionAsync({ username });
	if (isExist.length < 1) {
		const salt = await bcrypt.genSalt();
		const encryptedPassword = await bcrypt.hash(password, salt);
		const createUser = await userModel.createUser({
			username,
			password: encryptedPassword,
		});
		if (createUser.insertId > 0) {
			return res.json({
				status: true,
				message: "Register success",
			});
		} else {
			return res.status(400).json({
				status: false,
				message: "Register failed",
			});
		}
	} else {
		return res.status(400).json({
			status: false,
			message: "Register failed, username already exists",
		});
	}
};