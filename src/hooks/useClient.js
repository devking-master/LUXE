// src/hooks/useUser.js
import { useState } from "react";
import { privateApiClient } from "../lib/client"; // ✅ use your privateApiClient, not raw axios

const useClient = (userId) => {
  /** -------------------- STATES -------------------- **/
  const [products, setProducts] = useState([]);
  const [singleProduct, setSingleProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");

  /** -------------------- PRODUCTS -------------------- **/
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await privateApiClient.get("/products");

      // ✅ Normalize
      const data = Array.isArray(res.data)
        ? res.data
        : res.data.products || [];

      setProducts(data);
    } catch (err) {
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const getProductById = async (id) => {
    try {
      const res = await privateApiClient.get(`/products/${id}`);
      return res.data;
    } catch (err) {
      setError("Failed to fetch product");
      return null;
    }
  };

  /** -------------------- CART -------------------- **/
  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
    setSuccess("Product added to cart");
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item._id !== id));
    setSuccess("Product removed from cart");
  };

  const clearCart = () => {
    setCart([]);
  };

  /** -------------------- ORDERS -------------------- **/
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await privateApiClient.get(`/orders/my-orders`);

      // ✅ Normalize the response
      const ordersData = Array.isArray(res.data)
        ? res.data
        : res.data.orders || [];

      setOrders(ordersData);
    } catch (err) {
      setError("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  const placeOrder = async () => {
    try {
      setLoading(true);
      const res = await privateApiClient.post(`/orders`, {
        userId,
        items: cart,
      });

      // ✅ Add safely
      const newOrder = res.data.order || res.data;
      setOrders((prev) => [...prev, newOrder]);

      setCart([]); // clear cart after order
      setSuccess("Order placed successfully!");
    } catch (err) {
      setError("Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  /** -------------------- PAYMENTS -------------------- **/
  const fetchPayments = async () => {
    try {
      setLoading(true);
      const res = await privateApiClient.get(`/payments/my-payments`);

      // ✅ Normalize the response
      const paymentsData = Array.isArray(res.data)
        ? res.data
        : res.data.payments || [];

      setPayments(paymentsData);
    } catch (err) {
      setError("Failed to fetch payments");
    } finally {
      setLoading(false);
    }
  };

  /** -------------------- RETURN -------------------- **/
  return {
    products,
    singleProduct,
    cart,
    orders,
    payments,
    loading,
    error,
    success,

    fetchProducts,
    getProductById,

    addToCart,
    removeFromCart,
    clearCart,

    fetchOrders,
    placeOrder,

    fetchPayments,
  };
};

export default useClient;
