import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    const exists = cart.find((p) => Number(p.id) === Number(item.id));
    if (exists) {
      alert("Already in cart!");
      return;
    }

    setCart([...cart, { ...item, qty: 1 }]);
    alert("Added to Cart!");
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => Number(item.id) !== Number(id)));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}
