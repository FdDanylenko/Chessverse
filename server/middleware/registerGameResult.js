const User = require("../model/User");

const registerGameResult = async (
  username,
  opponentUsername,
  reason,
  result,
  movesCount,
  date
) => {
  const foundUser = await User.findOne({ username }).exec();
  if (!foundUser) {
    return;
  }
  foundUser.gameResults.push({
    playerUsername: username,
    opponentUsername,
    reason,
    result,
    movesCount,
    date,
  });
  await foundUser.save();
};

module.exports = registerGameResult;
