import { useEffect, useState, useContext } from "react";
import API from "../api/api";
import { AuthContext } from "../context/AuthContext";

// Dummy Data (only shown when not logged in)
const dummyData = [
  {
    id: 1,
    name: "Fresh Tomatoes",
    category: "vegetable",
    image_url: "https://media.istockphoto.com/id/589985234/photo/homegrown-tomatoes.jpg?s=612x612",
  },
  {
    id: 2,
    name: "Organic Potatoes",
    category: "vegetable",
    image_url: "https://cdn.pixabay.com/photo/2023/02/04/08/18/potatoes-7766688_1280.jpg",
  },
  {
    id: 3,
    name: "Farm Apples",
    category: "fruit",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/1/15/Red_Apple.jpg",
  },
];

export default function ProductsPage() {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // If not logged in -> show dummy items
    if (!user) {
      setProducts(dummyData);
      return;
    }

    // If logged in -> fetch products from DB
    API.get("/products")
      .then((res) => {
        if (res.data.length > 0) {
          setProducts(res.data);
        } else {
          setProducts([]); // empty state
        }
      })
      .catch(() => setProducts([]));
  }, [user]);

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={styles.title}>
        {user ? "Fresh Farm Products" : "Discover Fresh Harvests Near You 🌱"}
      </h2>

      {!user && (
        <p style={styles.loginMsg}>
          Login to see real farmer prices & support local farmers!
        </p>
      )}

      {/* Product Grid */}
      <div style={styles.grid}>
        {products.map((item) => (
          <div key={item.id} style={styles.card}>
            <img
              src={item.image_url || "https://via.placeholder.com/200"}
              alt={item.name}
              style={styles.image}
            />
            <h3 style={styles.name}>{item.name}</h3>

            <span style={styles.category}>
              {item.category?.toUpperCase() || "Product"}
            </span>

            {user ? (
              <p style={styles.price}>
                Farmer Price: ₹{item.farmer_price} <br />
                <span style={styles.market}>
                  Market: ₹{item.market_price}
                </span>
              </p>
            ) : (
              <p style={styles.guestMsg}>Login to see price 🔐</p>
            )}
          </div>
        ))}
      </div>

      {products.length === 0 && (
        <p style={{ textAlign: "center", marginTop: "20px" }}>
          No products available yet.
        </p>
      )}
    </div>
  );
}

// CSS Styles
const styles = {
  title: {
    textAlign: "center",
    fontSize: "30px",
    fontWeight: "700",
    color: "#1b5e20",
    marginBottom: "10px",
  },
  loginMsg: {
    textAlign: "center",
    color: "#555",
    marginBottom: "20px",
    fontSize: "14px",
    fontWeight: "bold",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "20px",
  },
  card: {
    background: "#fff",
    borderRadius: "10px",
    padding: "12px",
    textAlign: "center",
    boxShadow: "0px 4px 10px rgba(0,0,0,0.15)",
  },
  image: {
    width: "100%",
    height: "160px",
    objectFit: "cover",
    borderRadius: "8px",
    marginBottom: "10px",
  },
  name: {
    color: "#1a5d20",
    fontSize: "20px",
    fontWeight: "600",
    marginBottom: "4px",
  },
  category: {
    background: "#c5e1a5",
    padding: "4px 10px",
    fontSize: "12px",
    borderRadius: "14px",
    color: "#1b5e20",
    fontWeight: "600",
  },
  price: {
    marginTop: "10px",
    fontWeight: "bold",
    color: "#1b5e20",
  },
  market: {
    textDecoration: "line-through",
    color: "#a62323",
    fontSize: "14px",
  },
  guestMsg: {
    color: "#d32f2f",
    fontStyle: "italic",
    marginTop: "10px",
  },
};
