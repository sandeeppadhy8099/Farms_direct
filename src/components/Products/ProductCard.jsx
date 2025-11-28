export default function ProductCard({ item }) {
    return (
      <div
        style={{
          border: "1px solid #ccc",
          padding: "15px",
          borderRadius: "8px",
          width: "200px"
        }}
      >
        <img
          src={item.image_url || "https://via.placeholder.com/150"}
          alt={item.name}
          style={{ width: "100%", borderRadius: "6px" }}
        />
        <h4>{item.name}</h4>
        <p>₹{item.farmer_price}</p>
        <small>Save: ₹{item.market_price - item.farmer_price}</small>
      </div>
    );
  }
  