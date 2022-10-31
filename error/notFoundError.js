import customAPIError from "./customAPIError.js";
import statusCode from "http-status-codes";
const statusCodes = statusCode.StatusCodes;

class notFoundError extends customAPIError {
  constructor(message) {
    super(message);
    this.statusCode = statusCodes.Not_FOUND;
  }
}
export default notFoundError;
