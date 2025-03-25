const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  nickname: {
    type: String,
    sparse: true,
    unique: true,
    required: false,
  },
  email: {
    type: String,
    sparse: true,
    unique: true,
    required: false,
  },
  password: {
    type: String,
    required: false,
  },
  googleId: {
    type: String,
    sparse: true,
    unique: true,
    required: false
  },
  displayName: {
    type: String,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  refreshToken: String,
});

module.exports = mongoose.model("User", userSchema);
