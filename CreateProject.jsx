import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateProject() {

  const [projectName, setProjectName] =
    useState("");

  const [file, setFile] = useState(null);

  const [loading, setLoading] =
    useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!projectName || !file) {
      alert(
        "Enter project name and upload image"
      );
      return;
    }

    try {

      setLoading(true);

      const formData = new FormData();

      formData.append(
        "projectName",
        projectName
      );

      formData.append(
        "map",
        file
      );

      const token = localStorage.getItem("token");


const res = await axios.post(
  "http://localhost:5000/api/projects/upload-map",
  formData,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

      navigate(
        `/map/${res.data.project._id}`,
        {
          state: {
            grid:
              res.data.project.grid,
            projectName:
              res.data.project.projectName,
          },
        }
      );

    } catch (err) {

      console.log(err);

      alert("Upload failed");

    } finally {

      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center items-center p-10">

      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-lg">

        <h1 className="text-4xl font-bold text-slate-800 mb-8">
          Create Project
        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6"
        >

          <input
            type="text"
            placeholder="Project Name"
            value={projectName}
            onChange={(e) =>
              setProjectName(e.target.value)
            }
            className="border border-slate-300 rounded-xl px-4 py-3 text-slate-800 outline-none focus:ring-2 focus:ring-cyan-400"
          />

          <input
            type="file"
            onChange={(e) =>
              setFile(e.target.files[0])
            }
            className="text-slate-700"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-xl text-lg font-semibold transition"
          >
            {loading
              ? "Uploading..."
              : "Generate Grid"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default CreateProject;

