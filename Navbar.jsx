import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleLogout = () => {

    localStorage.removeItem("token");

    navigate("/login");
  };

  return (
    <nav className="w-full bg-slate-950 border-b border-cyan-500/20 px-8 py-4 flex items-center justify-between sticky top-0 z-50">

      <div className="text-2xl font-bold text-cyan-400 tracking-wide">
        SwarmPath
      </div>

      <div className="flex gap-6 text-sm font-medium">

        <Link
          to="/"
          className="text-gray-300 hover:text-cyan-400 transition"
        >
          Home
        </Link>

        <Link
          to="/dashboard"
          className="text-gray-300 hover:text-cyan-400 transition"
        >
          Dashboard
        </Link>

        <Link
          to="/create"
          className="text-gray-300 hover:text-cyan-400 transition"
        >
          Create Project
        </Link>

        <Link
          to="/view"
          className="text-gray-300 hover:text-cyan-400 transition"
        >
          View Projects
        </Link>

      </div>

      <div className="flex gap-3">

        {!token ? (
          <>
            <Link
              to="/login"
              className="px-4 py-2 rounded-lg border border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-black transition"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="px-4 py-2 rounded-lg bg-cyan-500 text-black font-semibold hover:bg-cyan-400 transition"
            >
              Signup
            </Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
          >
            Logout
          </button>
        )}

      </div>
    </nav>
  );
}

export default Navbar;
