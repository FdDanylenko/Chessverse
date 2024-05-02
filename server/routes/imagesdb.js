const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/:imagePath&:imageName", (req, res) => {
  const imagePath = req.params.imagePath;
  const imageName = req.params.imageName;
  res.sendFile(path.join(__dirname, "..", "db", imagePath, imageName));
});

module.exports = router;
