const express = require("express");
const router = express.Router();

//importar config do uploadImg
const uploadImg = require("../config/cloudinary.config");

router.post("/upload-image", uploadImg.single("picture"), (req, res) => {
  if (!req.file) {
    return res.status(500).json({ msg: "upload fail" });
  }

  console.log(req.file);

  return res.status(200).json({ url: req.file.path });
});

module.exports = router;
