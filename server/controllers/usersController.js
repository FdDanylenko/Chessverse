const User = require("../model/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { sendEmail } = require("../middleware/mailer");

const getUserData = async (req, res) => {
  const id = req.body.id;
  if (!id) {
    return res.status(400).json({ message: "Id is required" });
  }
  const result = await User.findOne({ _id: id }).exec();
  if (!result) return res.status(204).json({ message: "No user" });
  res.json(result);
};

const handleNewUser = async (req, res) => {
  const { username, email, password } = req.body;
  if (!email || !username || !password) {
    console.log("Username, email and password are required");
  }
  const duplicate = await User.findOne({ username }).exec();
  if (duplicate) {
    return res
      .status(409)
      .json({ message: `User with username ${username} already exists` });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      username,
      email,
      password: hashedPassword,
    });
    res.status(201).json({ success: `New user ${username} created!` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const handleAuth = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({
      message: "Username and password are required",
      body: `${req.body.password} ${req.body.username}`,
    });
  }
  const foundUser = await User.findOne({ username }).exec();
  if (!foundUser) {
    return res.sendStatus(401);
  }
  const match = await bcrypt.compare(password, foundUser.password);
  if (match) {
    const accessToken = jwt.sign(
      {
        userInfo: {
          username: foundUser.username,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "5m" }
    );
    const refreshToken = jwt.sign(
      { username: foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "3d" }
    );
    foundUser.refreshToken = refreshToken;
    await foundUser.save();
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "none",
      maxAge: 3 * 24 * 60 * 60 * 1000,
      secure: true,
    });
    return res.json({ accessToken });
  } else {
    res.sendStatus(401);
  }
};

const handleLogout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);
  const refreshToken = cookies.jwt;

  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None" }); // secure: true
    return res.sendStatus(404);
  }
  foundUser.refreshToken = "";
  await foundUser.save();
  res.clearCookie("jwt", { httpOnly: true, sameSite: "None" }); // secure: true
  res.sendStatus(204);
};

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  console.log(cookies);
  if (!cookies?.jwt) {
    return res.sendStatus(204);
  }
  const refreshToken = cookies.jwt;
  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) {
    return res.sendStatus(403);
  }
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser.username !== decoded.username)
      return res.sendStatus(403);
    const accessToken = jwt.sign(
      {
        userInfo: {
          username: foundUser.username,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "5m" }
    );
    res.json({ accessToken });
  });
};

const handleUpdateProfile = async (req, res) => {
  const {
    id,
    username,
    firstName,
    lastName,
    email,
    country,
    language,
    status,
    aboutMe,
  } = req.body;
  if (!id) {
    return res.status(400).json({ message: "Id is required" });
  }
  const foundUser = await User.findOne({ _id: id }).exec();
  if (!foundUser) {
    return res.sendStatus(401);
  }
  if (username) foundUser.username = username;
  if (firstName) foundUser.firstName = firstName;
  if (lastName) foundUser.lastName = lastName;
  if (email) foundUser.email = email;
  if (country) foundUser.country = country;
  if (language) foundUser.language = language;
  if (status) foundUser.status = status;
  if (aboutMe) foundUser.aboutMe = aboutMe;
  await foundUser.save();
  res.status(200).json({ message: "User has been updated" });
};

module.exports = {
  getUserData,
  handleNewUser,
  handleAuth,
  handleLogout,
  handleRefreshToken,
  handleUpdateProfile,
};
