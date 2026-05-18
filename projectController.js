const path = require("path");
const fs = require("fs");


// =====================================
// Upload Map Controller
// =====================================
const { spawn } = require("child_process");
const Project = require("../models/Project");

const uploadMap = async (req, res) => {

  try {

    if (!req.file) {
      return res.status(400).json({
        message: "No image uploaded",
      });
    }

    // uploads folder
    const uploadsDir = path.join(
      __dirname,
      "../uploads"
    );

    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir);
    }

    // save image
    const imagePath = path.join(
      uploadsDir,
      `${Date.now()}-${req.file.originalname}`
    );

    fs.writeFileSync(
      imagePath,
      req.file.buffer
    );

    // python file
    const scriptPath = path.join(
      __dirname,
      "../python/grid_converter.py"
    );

    // run python
    const pythonProcess = spawn(
      "python",
      [scriptPath, imagePath]
    );

    let dataString = "";

    pythonProcess.stdout.on(
      "data",
      (data) => {

        dataString += data.toString();
      }
    );

    pythonProcess.stderr.on(
      "data",
      (data) => {

        console.log(
          "PYTHON ERROR:",
          data.toString()
        );
      }
    );

   pythonProcess.on(
  "close",
  async (code) => {

        try {

          const parsed =
            JSON.parse(dataString);

          const grid = parsed.grid;
          const generateThumbnail = (grid) => {
  return grid.map(row =>
    row.map(cell => (cell === 1 ? "⬛" : "⬜")).join("")
  ).join("\n");
};

const thumbnail = generateThumbnail(grid);

          const userId = req.user._id;

const project = await Project.create({
  user: userId,
  projectName: req.body.projectName,
  grid,
  thumbnail,
});

return res.json({
  success: true,
  project,
});

        } catch (err) {

          console.log(err);

          return res.status(500).json({
            message:
              "Grid conversion failed",
          });
        }
      }
    );

  } catch (err) {

    console.log(err);

    return res.status(500).json({
      message: "Upload failed",
    });
  }
};

// =====================================
// Path Finding Controller
// =====================================
const aStar = require("../utils/astar");

const getPath = async (req, res) => {

  try {

    const { grid, start, end } = req.body;

    if (!grid || !start || !end) {

      return res.status(400).json({
        message: "grid, start and end required",
      });
    }

    const result = aStar(grid, start, end);

    return res.json({
      success: true,
      path: result.path || [],
      visited: result.visited || [],
      explanation:
        "Path generated successfully using occupancy grid navigation",
    });

  } catch (err) {

    console.log(err);

    return res.status(500).json({
      message: "Path generation failed",
    });
  }
};

module.exports = {
  uploadMap,
  getPath,
};
