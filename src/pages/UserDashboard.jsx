import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

export default function UserDashboard() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    API.get("/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  // Group products by name (unique product list)
  const groupedProducts = products.reduce((acc, item) => {
    const key = item.name.toLowerCase();
    if (!acc[key]) acc[key] = item;
    return acc;
  }, {});

  // Search filter
  const filteredProducts = Object.values(groupedProducts).filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🛒 Buy Fresh From Farmers</h2>

      {/* Search Bar */}
      <input
        style={styles.search}
        placeholder="Search fruits, vegetables, essentials..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div style={styles.grid}>
        {filteredProducts.map((item) => (
          <div key={item.id} style={styles.card}>
            <img
              src={item.image_url || "https://via.placeholder.com/200"}
              alt={item.name}
              style={styles.image}
            />
            <h3 style={styles.name}>{item.name}</h3>

            <button
              style={styles.button}
              onClick={() => navigate(`/product/${item.name}`)}
            >
              View Farmer Prices ➜
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// Inline Styles
const styles = {
  container: {
    padding: "20px",
    textAlign: "center",
  },
  title: {
    color: "#1b5e20",
    marginBottom: "20px",
    fontSize: "26px",
    fontWeight: "bold",
  },
  search: {
    padding: "12px",
    width: "300px",
    borderRadius: "6px",
    border: "1px solid #aaa",
    marginBottom: "20px",
    outline: "none",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "20px",
    justifyContent: "center",
  },
  card: {
    background: "#fff",
    borderRadius: "10px",
    padding: "12px",
    boxShadow: "0px 4px 10px rgba(0,0,0,0.15)",
    transition: "0.3s",
  },
  image: {
    width: "100%",
    height: "160px",
    objectFit: "cover",
    borderRadius: "8px",
    marginBottom: "10px",
  },
  name: {
    fontWeight: "bold",
    color: "#1b5e20",
    marginBottom: "10px",
    fontSize: "18px",
  },
  button: {
    background: "#1b5e20",
    color: "#fff",
    padding: "10px 12px",
    width: "100%",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
    border: "none",
  },
};
