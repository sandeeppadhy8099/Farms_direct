import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api";
import { CartContext } from "../context/CartContext";

export default function ProductDetails() {
  const { name } = useParams();
  const [farmers, setFarmers] = useState([]);
  const { addToCart } = useContext(CartContext); // ⭐ FIX HERE

  useEffect(() => {
    API.get("/products")
      .then((res) => {
        const filtered = res.data.filter(
          (p) => p.name.toLowerCase() === name.toLowerCase()
        );
        setFarmers(filtered);
      })
      .catch((err) => console.log(err));
  }, [name]);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🧾 {name}</h2>
      <p style={{ marginBottom: "15px" }}>
        Showing offers from different farmers 👨‍🌾
      </p>

      <div style={styles.grid}>
        {farmers.map((item) => (
          <div key={`${item.id}-${item.farmer_id}`} style={styles.card}>
            <img
              src={item.image_url || "https://via.placeholder.com/200"}
              alt={item.name}
              style={styles.image}
            />

            <h3 style={styles.farmerName}>Farmer ID: {item.farmer_id}</h3>

            <p style={styles.price}>Price: ₹{item.farmer_price}</p>
            <p style={styles.location}>📍 {item.location || "Village"}</p>

            {/* ⭐ WORKING ADD TO CART */}
            <button style={styles.btn} onClick={() => addToCart(item)}>
              Add to Cart 🛒
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// Inline Styles
const styles = {
  container: { padding: "20px", textAlign: "center" },
  title: {
    fontSize: "26px",
    fontWeight: "bold",
    color: "#1b5e20",
    marginBottom: "10px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "20px",
    marginTop: "20px",
  },
  card: {
    background: "#ffffff",
    padding: "12px",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0,0,0,0.15)",
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: "160px",
    objectFit: "cover",
    borderRadius: "8px",
    marginBottom: "8px",
  },
  farmerName: {
    fontWeight: "bold",
    fontSize: "16px",
    color: "#1b5e20",
  },
  price: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#2e7d32",
  },
  location: {
    fontSize: "14px",
    color: "#555",
  },
  btn: {
    background: "#1b5e20",
    color: "#fff",
    width: "100%",
    borderRadius: "6px",
    padding: "10px",
    marginTop: "10px",
    cursor: "pointer",
    fontWeight: "600",
    border: "none",
  },
};
