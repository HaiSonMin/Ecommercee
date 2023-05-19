const CustomErrorApi = require("./custom-error-api");
const { StatusCodes } = require("http-status-codes");
class BadRequestError extends CustomErrorApi {
  constructor(message) {
    supper(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

module.exports = BadRequestError;
