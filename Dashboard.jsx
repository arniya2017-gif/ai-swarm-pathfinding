import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-100">

      <Navbar />

      <div className="p-10">

        <h1 className="text-4xl font-bold text-slate-800 mb-3">
          Dashboard
        </h1>

        <p className="text-gray-600 mb-10">
          Manage your swarm pathfinding projects and simulations.
        </p>

        <div className="grid md:grid-cols-3 gap-8">

          {/* CREATE PROJECT */}

          <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">

            <h2 className="text-2xl font-bold mb-4 text-cyan-600">
              Create Project
            </h2>

            <p className="text-gray-600 mb-6">
              Upload occupancy maps and start pathfinding simulations.
            </p>

            <Link
              to="/create"
              className="inline-block px-6 py-3 bg-cyan-500 text-white rounded-xl hover:bg-cyan-600 transition"
            >
              Open
            </Link>
          </div>

          {/* VIEW PROJECTS */}

          <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">

            <h2 className="text-2xl font-bold mb-4 text-cyan-600">
              View Projects
            </h2>

            <p className="text-gray-600 mb-6">
              Access saved projects and continue editing simulations.
            </p>

            <Link
              to="/view"
              className="inline-block px-6 py-3 bg-cyan-500 text-white rounded-xl hover:bg-cyan-600 transition"
            >
              Open
            </Link>
          </div>

          {/* AI ANALYSIS */}

          <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">

            <h2 className="text-2xl font-bold mb-4 text-cyan-600">
              AI Analysis
            </h2>

            <p className="text-gray-600 mb-6">
              Get intelligent explanations for generated paths.
            </p>

            <button
              className="px-6 py-3 bg-slate-800 text-white rounded-xl"
            >
              Coming Soon
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;
