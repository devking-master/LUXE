// src/AuthContext/CartContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { privateApiClient } from "../lib/client";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]); // cart = array of items { _id, productId: { ...product }, quantity }

  // fetch cart on mount
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await privateApiClient.get("/cart");
        // backend returns { cart: { userId, items: [...] } }
        setCart(res.data?.cart?.items || []);
      } catch (err) {
        console.error("fetchCart error:", err.response?.data || err.message);
      }
    };
    fetchCart();
  }, []);

  // add to cart (or increase)
  const addToCart = async (product, qty = 1) => {
    try {
      const res = await privateApiClient.post("/cart/add", {
        productId: product._id,
        quantity: qty,
      });
      setCart(res.data?.cart?.items || []);
    } catch (err) {
      console.error("addToCart error:", err.response?.data || err.message);
      // Optionally: show UI error notification
    }
  };

  // increase quantity by 1
  const increaseQuantity = async (productId) => {
    try {
      const res = await privateApiClient.post("/cart/add", {
        productId,
        quantity: 1,
      });
      setCart(res.data?.cart?.items || []);
    } catch (err) {
      console.error("increaseQuantity error:", err.response?.data || err.message);
    }
  };

  // decrease quantity by 1 (if reaches 0 backend removes item)
  const decreaseQuantity = async (productId) => {
    try {
      const res = await privateApiClient.post("/cart/decrease", {
        productId,
        quantity: 1,
      });
      setCart(res.data?.cart?.items || []);
    } catch (err) {
      console.error("decreaseQuantity error:", err.response?.data || err.message);
    }
  };

  // remove whole item
  const removeFromCart = async (productId) => {
    try {
      const res = await privateApiClient.post("/cart/remove", {
        productId,
      });
      setCart(res.data?.cart?.items || []);
    } catch (err) {
      console.error("removeFromCart error:", err.response?.data || err.message);
    }
  };

  const clearCart = () => setCart([]); // could be hooked to backend if you add a route

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
