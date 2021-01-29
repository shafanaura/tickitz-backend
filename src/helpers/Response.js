module.exports = {
	ResponseStatus: (res, code, message, data, info) => {
		return res.status(`${code}`).json({
			status: code === 200 ? true : false,
			status_code: code,
			message: message,
			data: data,
			info: info,
		});
	},
};
