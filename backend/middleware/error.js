const ErrorHandler = require("../utils/ErrorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal server Error";

  // db error

  if (err.name === "CastError") {
    const message = `Resources not found with this id. Invalid ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  // key error
  if (err.code === 11000) {
    const message = `Key duplicated ${Object.keys(err.keyValue)}`;
    err = new ErrorHandler(message, 400);
  }

  // token error
  if (err.name === "JsonWebTokenError") {
    const message = `Url is invalid`;
    err = new ErrorHandler(message, 400);
  }

  // token expired
  if (err.name === "TokenExpiredError") {
    const message = `Url is expired`;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
