import statusCode from "http-status-codes";
const statusCodes = statusCode.StatusCodes;

// console.log(statusCodes);
export default function errorHandlerMiddleWare(err, req, res, next) {
  const defaultErr = {
    statusCode: statusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "something wnt wrong",
  };
  if (err.name === "ValidationError") {
    defaultErr.statusCode = statusCode.BAD_REQUEST;
    defaultErr.msg = Object.values(err.errors)
      .map((item) => {
        return item.message;
      })
      .join(",");
  }
  if (err.code && err.code === 11000) {
    defaultErr.statusCode = statusCode.BAD_REQUEST;
    defaultErr.msg = `${Object.keys(err.keyValue)} must be Unique`;
  }
  // console.log(err);
  res.status(defaultErr.statusCode).json({ Error: defaultErr.msg });
  // res.status(defaultErr.statusCode).json({ Error: err });
}
