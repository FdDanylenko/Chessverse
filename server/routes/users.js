const express = require("express");
const multer = require("multer");
const path = require("path");
const verifyJWT = require("../middleware/verifyJWT");
const {
  getUserData,
  handleNewUser,
  handleAuth,
  handleLogout,
  handleRefreshToken,
  handleUpdateProfile,
  uploadProfilePicture,
  changeElo,
} = require("../controllers/usersController");
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "db/images/");
  },
  filename: (req, file, cb) => {
    const username = req.body.username;
    cb(null, file.originalname);
    // cb(null, username + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

router
  .route("/uploadProfilePicture")
  .post(upload.single("picture"), uploadProfilePicture);

router.route("/getUserData").post(verifyJWT, getUserData);
router.route("/register").post(handleNewUser);
router.route("/login").post(handleAuth);
router.route("/logout").post(handleLogout);
router.route("/refresh").post(handleRefreshToken);
router.route("/update").post(verifyJWT, handleUpdateProfile);
router.route("/shiftElo").post(verifyJWT, changeElo);

module.exports = router;
