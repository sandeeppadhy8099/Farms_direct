import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { CartContext } from "../../context/CartContext";

export default function Navbar() {
  const { user, logoutUser } = useContext(AuthContext);
  const { cart } = useContext(CartContext);

  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>Farms Direct</h2>

      <div style={styles.links}>

        {!user && (
          <Link style={styles.link} to="/">
            Home
          </Link>
        )}

        {!user && (
          <>
            <Link style={styles.link} to="/login">Login</Link>
            <Link style={styles.link} to="/register">Register</Link>
          </>
        )}

        {/* Farmer dashboard */}
        {user?.role === "farmer" && (
          <Link style={styles.link} to="/farmer-dashboard">Dashboard</Link>
        )}

        {/* User dashboard + Cart */}
        {user?.role === "user" && (
          <>
            <Link style={styles.link} to="/user-dashboard">Products</Link>
            <Link style={styles.link} to="/cart">
              Cart 🛒 ({cart?.length || 0})
            </Link>
          </>
        )}

        {user && (
          <button style={styles.logout} onClick={logoutUser}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    background: "#1b5e20",
    padding: "12px 25px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: "22px",
  },
  links: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    fontSize: "16px",
    fontWeight: "bold",
  },
  logout: {
    background: "#c62828",
    color: "#fff",
    padding: "8px 12px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "600",
  },
};
