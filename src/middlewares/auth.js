const jwt = require("jsonwebtoken");
const { APP_KEY } = process.env;
const userModel = require("../models/users");

exports.authCheck = (req, res, next) => {
	const { authorization } = req.headers;
	if (authorization && authorization.startsWith("Bearer")) {
		const token = authorization.substr(7);
		const data = jwt.verify(token, APP_KEY);
		if (data) {
			req.userData = data;
			return next();
		}
	}
	return res.status(401).json({
		status: false,
		message: "Authorization needed",
	});
};

exports.authRole = (roles) => {
	return async (req, res, next) => {
		const data = req.userData;
		const userRole = await userModel.getUsersByConditionAsync({
			id: data.id,
		});
		if (userRole[0].role === roles) {
			return next();
		} else {
			return res.status(403).json({
				status: false,
				message: "You don't have permission",
			});
		}
	};
};
