const express = require("express");
const router = express.Router();

const {
  getPath,
  multiAgentPath
} = require("../controllers/pathController");

// single path
router.post("/get-path", getPath);

// multi-agent path
router.post("/multi-path", multiAgentPath);

module.exports = router;
