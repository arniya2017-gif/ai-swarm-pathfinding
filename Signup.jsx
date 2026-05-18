import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Signup() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(
        "http://localhost:5000/api/auth/signup",
        form
      );

      // Save token
      localStorage.setItem(
        "token",
        res.data.token
      );

      // Save user
      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      alert("Signup successful");

      navigate("/dashboard");

    } catch (err) {

      console.log(err);

      alert(
        err.response?.data?.message ||
        "Signup failed"
      );
    }
  };

  return (
    <div style={styles.container}>

      <div style={styles.box}>

        <h2>Swarm Pathfinder</h2>

        <p>Create your account</p>

        <form
          onSubmit={handleSubmit}
          style={styles.form}
        >

          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
            style={styles.input}
          />

          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
              })
            }
            style={styles.input}
          />

          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) =>
              setForm({
                ...form,
                password: e.target.value,
              })
            }
            style={styles.input}
          />

          <button
            type="submit"
            style={styles.button}
          >
            Signup
          </button>

        </form>

      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#0f172a",
    color: "white",
  },

  box: {
    padding: "30px",
    borderRadius: "10px",
    background: "#1e293b",
    width: "320px",
    textAlign: "center",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginTop: "20px",
  },

  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "none",
  },

  button: {
    padding: "10px",
    background: "#38bdf8",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default Signup;
