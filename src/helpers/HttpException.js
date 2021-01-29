class HttpException extends Error {
	constructor(status, message, data) {
		super(status, message, data);
		this.status = status;
		this.message = message;
		this.data = data;
	}
}

module.exports = HttpException;
