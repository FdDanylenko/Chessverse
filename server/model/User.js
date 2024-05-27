const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  firstName: String,
  lastName: String,
  email: String,
  country: String,
  language: String,
  status: String,
  aboutMe: String,
  profilePicture: String,
  elo: Number,
  gameResults: [
    {
      playerUsername: String,
      opponentUsername: String,
      reason: String,
      result: String,
      movesCount: Number,
      date: String,
    },
  ],
  refreshToken: String,
});

module.exports = mongoose.model("User", userSchema);
