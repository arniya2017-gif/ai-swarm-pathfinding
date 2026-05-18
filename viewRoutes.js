const express = require("express");

const router = express.Router();

const {
  getProjects,
  deleteProject,
  updateProjectName,
  updateProjectMap,
} = require("../controllers/viewController");

const upload = require("../middleware/upload");

const {
  protect,
} = require("../middleware/authMiddleware");

// Get logged-in user's projects
router.get(
  "/projects",
  protect,
  getProjects
);

router.delete(
  "/projects/:id",
  protect,
  deleteProject
);

router.put(
  "/projects/:id",
  protect,
  updateProjectName
);

router.put(
  "/projects/:id/map",
  protect,
  upload.single("map"),
  updateProjectMap
);

module.exports = router;
