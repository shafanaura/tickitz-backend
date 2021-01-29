const userModel = require("../models/users");
const bcrypt = require("bcrypt");
const { APP_KEY } = process.env;
const jwt = require("jsonwebtoken");
const Role = require("../utils/userRoles.utils");
const status = require("../helpers/Response");

exports.login = async (req, res) => {
	const { email, password } = req.body;
	const existingUser = await userModel.getUsersByConditionAsync({ email });
	if (existingUser.length > 0) {
		const compare = await bcrypt.compare(password, existingUser[0].password);
		if (compare) {
			const { id } = existingUser[0];
			const token = jwt.sign({ id }, APP_KEY);
			return status.ResponseStatus(res, 200, "Login successfully", token);
		}
	}
	return status.ResponseStatus(res, 401, "Wrong email or password");
};

exports.register = async (req, res) => {
	const { email, password, role = Role.User } = req.body;
	const isExist = await userModel.getUsersByConditionAsync({ email });
	if (isExist.length < 1) {
		const salt = await bcrypt.genSalt();
		const encryptedPassword = await bcrypt.hash(password, salt);
		const createUser = await userModel.createUser({
			email,
			role,
			password: encryptedPassword,
		});
		if (createUser.insertId > 0) {
			return status.ResponseStatus(res, 200, "Register Success");
		} else {
			return status.ResponseStatus(res, 400, "Register Failed");
		}
	} else {
		return status.ResponseStatus(
			res,
			400,
			"Register failed, email already exists",
		);
	}
};
