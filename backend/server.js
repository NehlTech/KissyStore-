// const { config } = require("dotenv");
const app = require("./app");
const connectDb = require("./db/Database");

// error_handling
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Uncaught exception handling....shutting down`);
});

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "backend/config/.env",
  });
}
// config ends

// db connection starts
connectDb();
// db connection ends

// server starts
const server = app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
// server ends

// promise rejection unhandles starts
process.on("unhandledRejection", (err) => {
  console.log(`Shutting down server for ${err.message}`);
  console.log(`Shutting down server for unhandle promise rejection`);

  server.close(() => {
    process.exit(1);
  });
});
// promise rejection unhandles ends
