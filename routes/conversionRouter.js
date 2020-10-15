const express = require("express");

const conversionController = require("../controller/conversionController");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();

router.post(
  "/resize/:width/:height",
  upload.single("image"),
  conversionController.resize
);
router.post(
  "/convert/:type",
  upload.single("image"),
  conversionController.convert
);

module.exports = router;
