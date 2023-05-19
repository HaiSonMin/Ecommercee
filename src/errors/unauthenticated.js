const CustomErrorApi = require("./custom-error-api");
const { StatusCodes } = require("http-status-codes");
class UnauthenticatedError extends CustomErrorApi {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

module.exports = UnauthenticatedError;
