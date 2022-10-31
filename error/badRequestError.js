import customAPIError from "./customAPIError.js";
import statusCode from "http-status-codes";
const statusCodes = statusCode.StatusCodes;

class badRequestError extends customAPIError {
  constructor(message) {
    super(message);
    this.statusCode = statusCodes.BAD_REQUEST;
  }
}
export default badRequestError;
