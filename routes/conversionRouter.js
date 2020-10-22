const express = require("express");

const conversionController = require("../controller/conversionController");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();

router.post("/modify", upload.single("image"), conversionController.modify);

module.exports = router;
