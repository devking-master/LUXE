import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/orders"; // adjust backend url if needed

export default function useOrders() {
  const [orders, setOrders] = useState([]);
  const [order, setOrder] = useState(null); // for single order
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ✅ Fetch all orders
  const getOrders = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setOrders(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  }, []);

  // ✅ Fetch a single order by ID
  const getOrderById = useCallback(async (id) => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/${id}`);
      setOrder(res.data);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch order");
    } finally {
      setLoading(false);
    }
  }, []);

  // ✅ Create a new order
  const createOrder = useCallback(async (orderData) => {
    try {
      setLoading(true);
      const res = await axios.post(API_URL, orderData);
      setOrders((prev) => [...prev, res.data]);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create order");
    } finally {
      setLoading(false);
    }
  }, []);

  // ✅ Update order
  const updateOrder = useCallback(async (id, updates) => {
    try {
      setLoading(true);
      const res = await axios.put(`${API_URL}/${id}`, updates);
      setOrders((prev) =>
        prev.map((o) => (o._id === id ? res.data : o))
      );
      if (order?._id === id) setOrder(res.data); // update single order if it's open
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update order");
    } finally {
      setLoading(false);
    }
  }, [order]);

  // ✅ Delete order
  const deleteOrder = useCallback(async (id) => {
    try {
      setLoading(true);
      await axios.delete(`${API_URL}/${id}`);
      setOrders((prev) => prev.filter((o) => o._id !== id));
      if (order?._id === id) setOrder(null); // clear details if deleted
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete order");
    } finally {
      setLoading(false);
    }
  }, [order]);

  return {
    orders,
    order,
    loading,
    error,
    getOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder,
  };
}
