import customAPIError from "./customAPIError.js";
import statusCode from "http-status-codes";
const statusCodes = statusCode.StatusCodes;

class unAuthorized extends customAPIError {
  constructor(message) {
    super(message);
    this.statusCode = statusCodes.UNAUTHORIZED;
  }
}
export default unAuthorized;
