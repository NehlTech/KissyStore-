const mongoose = require("mongoose");

const connectDb = () => {
  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(`mongodb connected with server: ${data.connection.host}`);
    });
  // console.log("Could not be connected");
};

module.exports = connectDb;
