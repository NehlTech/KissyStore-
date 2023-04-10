const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const token = require("jsonwebtoken");

const userModule = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Enter your name!"],
  },
  email: {
    type: String,
    required: [true, "Enter your email address"],
  },
  password: {
    type: String,
    required: [true, "Enter your password"],
    minLength: [6, "Password should be greater than 6 characters"],
    select: false,
  },
  address: {
    type: String,
  },
  role: {
    type: String,
    default: "user",
  },
  avatar: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  resetPasswordToken: String,
  resetPasswordTime: Date,
});

// passcode encrypt
userModule.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// token
userModule.methods.getJwtToken = function () {
  return token.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

// compare password
userModule.methods.comparePassword = async function (passwordEntered) {
  return await bcrypt.compare(passwordEntered, this.password);
};

module.exports = mongoose.model("User", userModule);
