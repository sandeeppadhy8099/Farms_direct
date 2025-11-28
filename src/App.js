import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import FarmerDashboard from "./components/Farmer/FarmerDashboard";
import UserDashboard from "./pages/UserDashboard";
import ForgotPassword from "./pages/ForgotPassword";
import Navbar from "./components/Layout/Navbar";
import PrivateRoute from "./components/HOC/PrivateRoute";
import CartPage from "./pages/CartPage";
import ProductDetails from "./pages/ProductDetails";

// ⬇⬇ IMPORTANT ⬇⬇
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <CartProvider> {/* 👈 Add this wrapper */}
      <BrowserRouter>
        <Navbar />

        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/product/:name" element={<ProductDetails />} />

          {/* User Routes */}
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/cart" element={<CartPage />} />

          {/* Farmer Protected Route */}
          <Route
            path="/farmer-dashboard"
            element={
              <PrivateRoute role="farmer">
                <FarmerDashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </CartProvider> /* 👈 Close wrapper */
  );
}

export default App;
