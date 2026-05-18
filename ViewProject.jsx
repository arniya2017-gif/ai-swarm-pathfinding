import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ViewProject() {

  const [projects, setProjects] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
const [newProjectName, setNewProjectName] =
  useState("");

  const navigate = useNavigate();

  useEffect(() => {

    fetchProjects();

  }, []);

  const fetchProjects = async () => {

    try {

      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/view/projects",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProjects(res.data.projects || []);

    } catch (err) {

      console.log(err);
    }
  };

  // SEARCH FILTER
  const filteredProjects = projects.filter(
    (project) =>
      project.projectName
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  // DELETE PROJECT
  const deleteProject = async (id) => {

    try {

      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:5000/api/view/projects/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchProjects();

    } catch (err) {

      console.log(err);

      alert("Delete failed");
    }
  };

  const updateProjectName = async (id) => {

  try {

    const token = localStorage.getItem("token");

    await axios.put(
      `http://localhost:5000/api/view/projects/${id}`,
      {
        projectName: newProjectName,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setEditingId(null);

    fetchProjects();

  } catch (err) {

    console.log(err);

    alert("Update failed");
  }
};

const changeMap = async (id, file) => {

  try {

    const token = localStorage.getItem("token");

    const formData = new FormData();

    formData.append("map", file);

    const res = await axios.put(
      `http://localhost:5000/api/view/projects/${id}/map`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type":
            "multipart/form-data",
        },
      }
    );

    navigate(`/map/${id}`, {
      state: {
        grid: res.data.project.grid,
        projectName:
          res.data.project.projectName,
      },
    });

  } catch (err) {

    console.log(err);

    alert("Map update failed");
  }
};

  return (
    <div className="min-h-screen bg-slate-100 p-10">

      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 gap-4">

        <h1 className="text-4xl font-bold text-slate-800">
          Saved Projects
        </h1>

        <input
          type="text"
          placeholder="Search projects..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="px-4 py-3 rounded-xl border border-slate-300 outline-none focus:ring-2 focus:ring-cyan-400 w-full md:w-80 text-slate-800 font-semibold"
        />

      </div>

      {filteredProjects.length === 0 ? (

        <div className="bg-white p-10 rounded-2xl shadow-lg">
          <p className="text-gray-600 text-lg">
            No projects found.
          </p>
        </div>

      ) : (

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {filteredProjects.map((project) => (

            <div
            
              key={project._id}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition"
            >
              <pre className="text-[6px] leading-[6px] bg-slate-100 p-2 rounded mb-4 overflow-hidden">
  {project.thumbnail}
</pre>

              {editingId === project._id ? (

  <input
    type="text"
    value={newProjectName}
    onChange={(e) =>
      setNewProjectName(e.target.value)
    }
    className="border border-slate-300 rounded-lg px-3 py-2 w-full mb-4 text-slate-800"
  />

) : (

  <h2 className="text-2xl font-bold text-cyan-600 mb-4">
    {project.projectName}
  </h2>

)}



              <p className="text-gray-500 mb-6">
                Created:
                {" "}
                {new Date(
                  project.createdAt
                ).toLocaleString()}
              </p>

              <div className="flex gap-3 flex-wrap">

  <button
    onClick={() =>
      navigate(`/map/${project._id}`, {
        state: {
          grid: project.grid,
          projectName:
            project.projectName,
          savedPath:
            project.path || [],
        },
      })
    }
    className="px-5 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition"
  >
    Open
  </button>

  {editingId === project._id ? (

    <button
      onClick={() =>
        updateProjectName(project._id)
      }
      className="px-5 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
    >
      Save
    </button>

  ) : (

    <button
      onClick={() => {
        setEditingId(project._id);
        setNewProjectName(
          project.projectName
        );
      }}
      className="px-5 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
    >
      Edit
    </button>

  )}

<label className="px-5 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition cursor-pointer">

  Change Map

  <input
    type="file"
    hidden
    onChange={(e) =>
      changeMap(
        project._id,
        e.target.files[0]
      )
    }
  />
</label>

  <button
    onClick={() =>
      deleteProject(project._id)
    }
    className="px-5 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
  >
    Delete
  </button>

</div>

            </div>
          ))}

        </div>
      )}
    </div>
  );
}

export default ViewProject;
