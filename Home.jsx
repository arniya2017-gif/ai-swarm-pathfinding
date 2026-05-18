import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white">

      <Navbar />

      <div className="relative flex flex-col items-center justify-center text-center px-6 py-24 overflow-hidden">

        <div className="absolute w-[500px] h-[500px] bg-cyan-500/20 blur-3xl rounded-full top-10"></div>
        <h1 className="text-6xl font-bold mb-6 leading-tight">
          AI Powered <span className="text-cyan-400">Swarm Pathfinding</span>
        </h1>

        <p className="max-w-3xl text-gray-300 text-lg mb-10">
          Create intelligent pathfinding simulations using occupancy grids,
          swarm robotics concepts, A* search, and AI-assisted analysis.
        </p>

        

      </div>
      {/* FEATURES SECTION */}

<div className="grid md:grid-cols-3 gap-8 px-10 pb-20">

  <div className="bg-slate-900 border border-cyan-500/20 rounded-2xl p-8 hover:border-cyan-400 transition">
    <h2 className="text-2xl font-bold text-cyan-400 mb-4">
      Smart Pathfinding
    </h2>

    <p className="text-gray-300">
      Generate shortest and safest paths using A* search algorithms on occupancy grids.
    </p>
  </div>

  <div className="bg-slate-900 border border-cyan-500/20 rounded-2xl p-8 hover:border-cyan-400 transition">
    <h2 className="text-2xl font-bold text-cyan-400 mb-4">
      Swarm Intelligence
    </h2>

    <p className="text-gray-300">
      Simulate robotic swarm coordination and intelligent navigation systems.
    </p>
  </div>

  <div className="bg-slate-900 border border-cyan-500/20 rounded-2xl p-8 hover:border-cyan-400 transition">
    <h2 className="text-2xl font-bold text-cyan-400 mb-4">
      AI Analysis
    </h2>

    <p className="text-gray-300">
      Integrate Gemini AI to explain path decisions, obstacles, and navigation efficiency.
    </p>
  </div>

</div>
    </div>
  );
}

export default Home;
