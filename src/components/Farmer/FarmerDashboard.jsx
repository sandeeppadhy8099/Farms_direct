import { useState, useEffect, useContext, useCallback } from "react";
import { AuthContext } from "../../context/AuthContext";
import API from "../../api/api";

export default function FarmerDashboard() {
  const { user } = useContext(AuthContext);

  const farmerId = `FARM-${(user?.id || 0).toString().padStart(3, "0")}`;

  const [product, setProduct] = useState({
    name: "",
    category: "",
    farmer_price: "",
    market_price: "",
    quantity: "",
    image_url: "",
  });

  const [myProducts, setMyProducts] = useState([]);

  const loadMyProducts = useCallback(() => {
    API.get("/products")
      .then((res) =>
        setMyProducts(res.data.filter((p) => p.farmer_id === user?.id))
      )
      .catch((err) => console.log(err));
  }, [user?.id]);

  useEffect(() => {
    loadMyProducts();
  }, [loadMyProducts]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!product.name || !product.farmer_price) {
      alert("Name and Price required!");
      return;
    }

    if (product.id) {
      // UPDATE PRODUCT
      await API.put(`/products/${product.id}`, product)
        .then(() => {
          alert("Product Updated!");
          setProduct({});
          loadMyProducts();
        })
        .catch((err) => console.log(err));
    } else {
      // ADD NEW PRODUCT
      await API.post("/products", { ...product, farmer_id: user?.id })
        .then(() => {
          alert("Product Added!");
          setProduct({});
          loadMyProducts();
        })
        .catch((err) => alert("Failed, try login again"));
    }
  };

  const deleteProduct = (id) => {
    if (window.confirm("Delete this product?")) {
      API.delete(`/products/${id}`)
        .then(() => {
          alert("Product deleted");
          loadMyProducts();
        })
        .catch((err) => console.log(err));
    }
  };

  const editProduct = (item) => {
    setProduct(item);
    window.scrollTo(0, 0);
  };

  return (
    <div style={styles.container}>
      {/* Farmer Profile */}
      <div style={styles.profileCard}>
        <h2>👨‍🌾 Welcome, {user?.name}</h2>
        <p><strong>Farmer ID:</strong> {farmerId}</p>
        <p><strong>Farm Name:</strong> {user?.farm_name}</p>
        <p><strong>Location:</strong> {user?.location}</p>
      </div>

      {/* Add/Edit Product Section */}
      <h2 style={{ color: "#1a5d20" }}>
        {product.id ? "✏️ Edit Product" : "➕ Add New Product"}
      </h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input placeholder="Product Name"
          value={product.name || ""}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
        />
        <input placeholder="Category (fruit/vegetable/essential)"
          value={product.category || ""}
          onChange={(e) => setProduct({ ...product, category: e.target.value })}
        />
        <input placeholder="Farmer Price ₹"
          value={product.farmer_price || ""}
          onChange={(e) => setProduct({ ...product, farmer_price: e.target.value })}
        />
        <input placeholder="Market Price ₹"
          value={product.market_price || ""}
          onChange={(e) => setProduct({ ...product, market_price: e.target.value })}
        />
        <input placeholder="Quantity"
          value={product.quantity || ""}
          onChange={(e) => setProduct({ ...product, quantity: e.target.value })}
        />
        <input placeholder="Image URL"
          value={product.image_url || ""}
          onChange={(e) => setProduct({ ...product, image_url: e.target.value })}
        />

        <button type="submit" style={styles.saveBtn}>
          {product.id ? "Update" : "Add"}
        </button>
      </form>

      {/* My Products List */}
      <h3 style={{ marginTop: "30px" }}>📦 My Products</h3>

      {myProducts.length === 0 && <p>No products added yet.</p>}

      <div style={styles.productsList}>
        {myProducts.map((item) => (
          <div key={item.id} style={styles.itemCard}>
<img
  src={item.image_url || "https://via.placeholder.com/200?text=No+Image"}
  alt={item.name}
  style={{
    width: "100%",
    height: "150px",
    objectFit: "cover",
    borderRadius: "8px",
    marginBottom: "8px",
  }}
/>

<strong>{item.name}</strong> — ₹{item.farmer_price}

            <div style={styles.btnGrp}>
              <button style={styles.editBtn} onClick={() => editProduct(item)}>
                Edit
              </button>
              <button style={styles.deleteBtn} onClick={() => deleteProduct(item.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: { padding: "20px" },
  profileCard: {
    background: "#e3f6e5",
    padding: "15px",
    borderRadius: "8px",
    borderLeft: "5px solid #1b5e20",
    marginBottom: "20px",
  },
  form: {
    display: "grid",
    gap: "10px",
    width: "300px",
    marginBottom: "20px",
  },
  saveBtn: {
    background: "#1b5e20",
    color: "#fff",
    padding: "10px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  productsList: {
    marginTop: "15px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "20px",
  },
  itemCard: {
    background: "#ffffff",
    padding: "12px",
    borderRadius: "10px",
    boxShadow: "0px 3px 10px rgba(0,0,0,0.2)",
    textAlign: "center",
  },
  btnGrp: {
    display: "flex",
    gap: "10px",
    marginTop: "8px",
  },
  editBtn: {
    background: "#1b5e20",
    color: "#fff",
    padding: "6px 10px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
  },
  deleteBtn: {
    background: "#d32f2f",
    color: "#fff",
    padding: "6px 10px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
  },
  productImg: {
    width: "100%",
    height: "160px",
    objectFit: "cover",
    borderRadius: "8px",
    marginBottom: "8px",
  },
  
};
