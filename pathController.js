const aStar = require("../utils/astar");
const { explainPath } = require("../utils/gemini");
const Project = require("../models/Project");

const getPath = async (req, res) => {
  try {
    const { grid, start, end, projectName } = req.body;

    if (!grid || !start || !end) {
      return res.status(400).json({
        message: "grid, start, end are required",
      });
    }

    // Step 1: A*
    const path = aStar(grid, start, end);

    // Step 2: Gemini explanation
    const result = aStar(grid, start, end);

    

// Gemini AI explanation
const explanation = await explainPath(
      grid,
      result.path,
      start,
      end
    );

return res.json({
  success: true,
  path: result.path || [],
  visited: result.visited || [],
  explanation: explanation || "No explanation generated",
});

    // Step 3: Save to DB
    const project = new Project({
      projectName: projectName || "Untitled",
      grid,
      path,
      explanation,
      start,
      end,
    });

    await project.save();

    return res.json({
      success: true,
      path,
      explanation,
      projectId: project._id,
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const multiAgentPath = async (req, res) => {
  try {
    const { grid, agents } = req.body;

    if (!grid || !agents) {
      return res.status(400).json({
        message: "grid and agents required",
      });
    }

    const results = [];

    for (let i = 0; i < agents.length; i++) {
      const { start, end } = agents[i];

      const result = aStar(grid, start, end);

      results.push({
        agentId: i,
        path: result.path,
        visited: result.visited,
      });
    }

    return res.json({
      success: true,
      agents: results,
    });

  } catch (err) {
    return res.status(500).json({
      message: "Multi-agent path failed",
    });
  }
};


module.exports = {
  getPath,
  multiAgentPath,
};

