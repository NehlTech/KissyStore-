const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const token = require("jsonwebtoken");
const User = require("../model/user");

exports.isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const { tokens } = req.cookies;

  if (!tokens) {
    return next(new ErrorHandler("Please login to continue", 401));
  }
  const decoded = token.verify(tokens, process.env.JWT_SECRET_KEY);

  req.user = await User.findById(decoded.id);
  next();
});
