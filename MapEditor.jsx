import { useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function MapEditor() {
  const location = useLocation();
  const { grid, projectName } = location.state || {};

  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);

  const [path, setPath] = useState([]);
  const [visited, setVisited] = useState([]);
  const [loading, setLoading] = useState(false);

  const [explanation, setExplanation] = useState("");

  const [robotPosition, setRobotPosition] = useState(null);

  if (!grid) return <h2>No grid found</h2>;

  // ======================
  // CLICK HANDLER
  // ======================
  const handleCellClick = (i, j) => {
    if (grid[i][j] === 1) return;

    if (!start) {
      setStart([i, j]);
      return;
    }

    if (!end) {
      setEnd([i, j]);
      return;
    }

    setStart([i, j]);
    setEnd(null);
    setPath([]);
    setVisited([]);
    setRobotPosition(null);
  };

  // ======================
  // GENERATE PATH
  // ======================
  const generatePath = async () => {
    try {
      if (!start || !end) {
        alert("Select start and end first");
        return;
      }

      setLoading(true);
      setRobotPosition(null);

      const res = await axios.post(
        "http://localhost:5000/api/path/get-path",
        {
          grid,
          start,
          end,
        }
      );

      const visitedNodes = res.data.visited || [];
      const finalPath = res.data.path || [];

      setExplanation(res.data.explanation || "");

      animatePath(visitedNodes, finalPath, () => {
        animateRobot(finalPath);
      });

    } catch (err) {
      console.log(err);
      alert("Path generation failed");
    } finally {
      setLoading(false);
    }
  };

  // ======================
  // ANIMATE VISITED + PATH
  // ======================
  const animatePath = (visitedNodes, finalPath, callback) => {
    setVisited([]);
    setPath([]);

    const visitedDelay = visitedNodes.length * 10;

    visitedNodes.forEach((node, index) => {
      setTimeout(() => {
        setVisited((prev) => [...prev, node]);
      }, index * 10);
    });

    finalPath.forEach((node, index) => {
      setTimeout(() => {
        setPath((prev) => [...prev, node]);

        if (index === finalPath.length - 1) {
          setTimeout(() => {
            if (callback) callback();
          }, 150);
        }
      }, visitedDelay + index * 40);
    });
  };

  // ======================
  // ROBOT ANIMATION
  // ======================
  const animateRobot = (finalPath) => {
    if (!finalPath.length) return;

    setRobotPosition(finalPath[0]);

    let i = 0;

    const interval = setInterval(() => {
      i++;

      if (i >= finalPath.length) {
        clearInterval(interval);
        return;
      }

      setRobotPosition(finalPath[i]);
    }, 150);
  };

  // ======================
  // RESET
  // ======================
  const reset = () => {
    setStart(null);
    setEnd(null);
    setPath([]);
    setVisited([]);
    setRobotPosition(null);
    setExplanation("");
  };

  // ======================
  // UI
  // ======================
  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center">

      {/* TOP BAR */}
      <div className="w-full bg-slate-950 text-white px-6 py-4 flex justify-between">
        <h1 className="text-cyan-400 font-bold text-xl">
          SwarmPath Editor (Single Robot)
        </h1>

        <div className="flex gap-3">
          <button
            onClick={generatePath}
            className="bg-cyan-500 px-4 py-2 rounded"
          >
            {loading ? "Generating..." : "Generate Path"}
          </button>

          <button
            onClick={reset}
            className="bg-red-500 px-4 py-2 rounded"
          >
            Reset
          </button>
        </div>
      </div>

      {/* TITLE */}
      <h2 className="text-3xl font-bold text-slate-800 mt-6">
        {projectName}
      </h2>

      <p className="text-gray-600 mb-4">
        Click → Start → End → Generate Path
      </p>

      {/* GRID */}
      <div
        className="grid gap-[2px] bg-slate-300 p-2 rounded shadow-lg"
        style={{
          gridTemplateColumns: `repeat(${grid[0].length}, 24px)`,
        }}
      >
        {grid.map((row, i) =>
          row.map((_, j) => {
            const isRobot =
              robotPosition?.[0] === i &&
              robotPosition?.[1] === j;

            const isStart =
              start?.[0] === i &&
              start?.[1] === j;

            const isEnd =
              end?.[0] === i &&
              end?.[1] === j;

            const isPath = path.some(
              (p) => p[0] === i && p[1] === j
            );

            const isVisited = visited.some(
              (v) => v[0] === i && v[1] === j
            );

            return (
              <div
                key={`${i}-${j}`}
                onClick={() => handleCellClick(i, j)}
                className="w-6 h-6 flex items-center justify-center text-[14px] cursor-pointer"
                style={{
                  backgroundColor: isRobot
                    ? "#a855f7"
                    : grid[i][j] === 1
                    ? "black"
                    : isStart
                    ? "#22c55e"
                    : isEnd
                    ? "#ef4444"
                    : isPath
                    ? "#facc15"
                    : isVisited
                    ? "#60a5fa"
                    : "white",
                }}
              >
                {isRobot ? "🤖" : ""}
              </div>
            );
          })
        )}
      </div>

      {/* AI PANEL */}
      <div className="w-full max-w-3xl mt-8 px-4 mb-10">
        {explanation ? (
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-bold text-cyan-600 mb-3">
              AI Path Explanation
            </h3>

            <p className="text-gray-700 whitespace-pre-line leading-6">
              {explanation}
            </p>
          </div>
        ) : (
          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-500 text-center">
              Generate a path to see AI explanation here
            </p>
          </div>
        )}
      </div>

    </div>
  );
}

export default MapEditor;
