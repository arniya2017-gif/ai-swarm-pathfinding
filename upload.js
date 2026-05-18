const multer = require("multer");

// Store files in memory (simple + fast for your project)
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
});

module.exports = upload;
