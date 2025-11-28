import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function CartPage() {
  const { cart, removeFromCart } = useContext(CartContext);

  const total = cart.reduce((sum, item) => sum + Number(item.farmer_price), 0);

  return (
    <div style={{ padding: "20px" }}>
      <h2>🛒 My Cart</h2>

      {cart.length === 0 && <p>No items in cart</p>}

      {cart.map((item) => (
        <div key={item.id} style={styles.card}>

          {/* ⭐ PRODUCT IMAGE FIX ADDED */}
          <img
            src={item.image_url || "https://via.placeholder.com/200?text=No+Image"}
            alt={item.name}
            style={styles.image}
          />

          <div>
            <strong>{item.name}</strong>
            <p style={styles.price}>₹{item.farmer_price}</p>
          </div>

          <button style={styles.removeBtn} onClick={() => removeFromCart(item.id)}>
            Remove ❌
          </button>
        </div>
      ))}

      {cart.length > 0 && (
        <h3>Total: ₹{total}</h3>
      )}
    </div>
  );
}

const styles = {
  card: {
    background: "#fff",
    padding: "12px",
    marginBottom: "10px",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    gap: "15px",
    boxShadow: "0px 4px 10px rgba(0,0,0,0.15)",
  },
  image: {
    width: "80px",
    height: "80px",
    objectFit: "cover",
    borderRadius: "6px",
  },
  price: {
    color: "#2e7d32",
    fontWeight: "bold",
    fontSize: "18px",
  },
  removeBtn: {
    background: "#d32f2f",
    color: "#fff",
    padding: "6px 10px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    fontWeight: "600",
    marginLeft: "auto",
  },
};
