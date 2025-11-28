import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import API from "../../api/api";

export default function LoginPage() {
  const { loginUser } = useContext(AuthContext);

  const [userMobile, setUserMobile] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [farmerMobile, setFarmerMobile] = useState("");
  const [farmerPassword, setFarmerPassword] = useState("");

  // USER LOGIN
  const handleUserLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", {
        mobile: userMobile,
        password: userPassword,
      });

      if (res.data.user.role !== "user") {
        return alert("This login is for USERS only!");
      }

      loginUser(res.data);
      window.location.href = "/user-dashboard";
    } catch {
      alert("Invalid Credentials!");
    }
  };

  // FARMER LOGIN
  const handleFarmerLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", {
        mobile: farmerMobile,
        password: farmerPassword,
      });

      if (res.data.user.role !== "farmer") {
        return alert("This login is for FARMERS only!");
      }

      loginUser(res.data);
      window.location.href = "/farmer-dashboard";
    } catch {
      alert("Invalid Credentials!");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.overlay}></div>

      <div style={styles.mainBox}>
        {/* USER LOGIN BOX */}
        <div style={styles.innerBox}>
          <h2 style={styles.heading}>User Login</h2>
          <form style={styles.form} onSubmit={handleUserLogin}>
            <input
              style={styles.input}
              placeholder="Mobile Number"
              onChange={(e) => setUserMobile(e.target.value)}
            />
            <input
              type="password"
              style={styles.input}
              placeholder="Password"
              onChange={(e) => setUserPassword(e.target.value)}
            />
            <button style={styles.button}>Login</button>

            <p style={styles.forgot}>
              <a href="/forgot-password?role=user">Forgot Password?</a>
            </p>
          </form>
        </div>

        {/* FARMER LOGIN BOX */}
        <div style={styles.innerBox}>
          <h2 style={styles.heading}>Farmer Login</h2>
          <form style={styles.form} onSubmit={handleFarmerLogin}>
            <input
              style={styles.input}
              placeholder="Mobile Number"
              onChange={(e) => setFarmerMobile(e.target.value)}
            />
            <input
              type="password"
              style={styles.input}
              placeholder="Password"
              onChange={(e) => setFarmerPassword(e.target.value)}
            />
            <button style={styles.button}>Login</button>

            <p style={styles.forgot}>
              <a href="/forgot-password?role=farmer">Forgot Password?</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

// 🔥 Styling
const styles = {
  container: {
    height: "100vh",
    width: "100%",
    position: "relative",
    overflow: "hidden",
    backgroundImage:
      "url('https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1350&q=80')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  overlay: {
    position: "absolute",
    height: "100%",
    width: "100%",
    background: "rgba(0, 0, 0, 0.4)",
    backdropFilter: "blur(2px)",
  },

  mainBox: {
    display: "flex",
    gap: "30px",
    zIndex: 2,
  },

  innerBox: {
    background: "rgba(255,255,255,0.2)",
    backdropFilter: "blur(10px)",
    padding: "25px",
    width: "310px",
    borderRadius: "12px",
    boxShadow: "0px 4px 20px rgba(0,0,0,0.3)",
    textAlign: "center",
    border: "1px solid rgba(255,255,255,0.4)",
  },

  heading: {
    fontSize: "22px",
    fontWeight: "bold",
    color: "#fff",
    marginBottom: "15px",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  input: {
    padding: "12px",
    borderRadius: "6px",
    border: "none",
    outline: "none",
  },

  button: {
    background: "#1b5e20",
    padding: "10px",
    color: "#fff",
    fontSize: "16px",
    borderRadius: "6px",
    cursor: "pointer",
    marginTop: "10px",
    fontWeight: "bold",
    border: "none",
  },

  forgot: {
    marginTop: "5px",
    textAlign: "right",
    fontWeight: "600",
  },
};
