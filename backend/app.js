const express = require("express");
const cookieParser = require("cookie-parser");
// const { config } = require("dotenv");
const ErrorHandler = require("./middleware/error");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

// const fileUpload = require("express-fileupload");

// app usage
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", express.static("uploads"));
// app.use(fileUpload({ useTempFiles: true }));

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "backend/config/.env",
  });
}

// import routes
const user = require("./controllers/user");
app.use("/api/v2/user", user);

// errorhandling
app.use(ErrorHandler);
module.exports = app;
