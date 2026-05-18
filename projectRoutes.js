const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");


const {
  uploadMap,
  getPath,
} = require("../controllers/projectController");

const { protect } = require("../middleware/authMiddleware");

// Upload map route
router.post(
  "/upload-map",
  protect,
  upload.single("map"),
  uploadMap
);

// Path finding route
router.post(
  "/get-path",
  getPath
);

module.exports = router;
