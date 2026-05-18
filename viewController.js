const Project = require("../models/Project");

// Get logged-in user's projects
const getProjects = async (req, res) => {

  try {

    const projects = await Project.find({
      user: req.user._id,
    }).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      projects,
    });

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });
  }
};

const deleteProject = async (req, res) => {

  try {

    const project = await Project.findById(
      req.params.id
    );

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    // Ensure project belongs to logged-in user
    if (
      project.user.toString() !==
      req.user._id.toString()
    ) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    await project.deleteOne();

    res.json({
      success: true,
      message: "Project deleted",
    });

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });
  }
};

const updateProjectName = async (req, res) => {

  try {

    const { projectName } = req.body;

    const project = await Project.findById(
      req.params.id
    );

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    // Ensure ownership
    if (
      project.user.toString() !==
      req.user._id.toString()
    ) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    project.projectName = projectName;

    await project.save();

    res.json({
      success: true,
      project,
    });

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });
  }
};

const updateProjectMap = async (req, res) => {

  try {

    const project = await Project.findById(
      req.params.id
    );

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    // Ownership check
    if (
      project.user.toString() !==
      req.user._id.toString()
    ) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    // Generate fresh random grid
    const grid = [];

    for (let i = 0; i < 20; i++) {

      let row = [];

      for (let j = 0; j < 20; j++) {

        const obstacle =
          Math.random() < 0.2 ? 1 : 0;

        row.push(obstacle);
      }

      grid.push(row);
    }

    // Update project
    project.grid = grid;

    // Reset old path data
    project.path = [];
    project.start = [];
    project.end = [];
    project.explanation = "";

    await project.save();

    res.json({
      success: true,
      project,
    });

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  getProjects,
  deleteProject,
  updateProjectName,
  updateProjectMap,
};
