const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  firstName: String,
  lastName: String,
  email: String,
  country: String,
  language: String,
  status: String,
  aboutMe: String,

  profilePicture: String,
  refreshToken: String,
});

module.exports = mongoose.model("User", userSchema);
