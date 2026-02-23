// src/hooks/useStaff.js
import { useState, useEffect, useCallback } from "react";
import { privateApiClient } from "../lib/client";

const API_ORDER_URL = "/api/orders";
const API_PAYMENT_URL = "/api/payments";

const useStaff = () => {
  /** ------------------ STATE ------------------ **/
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [payments, setPayments] = useState([]);

  const [singleProduct, setSingleProduct] = useState(null);
  const [singleOrder, setSingleOrder] = useState(null);
  const [singlePayment, setSinglePayment] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /** ------------------ PRODUCT FUNCTIONS ------------------ **/

  // ✅ Fetch all products
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const res = await privateApiClient.get("/products");
      const data = Array.isArray(res.data) ? res.data : res.data.products;
      setProducts(data || []);
    } catch (err) {
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  }, []);

  // ✅ Get single product
  const getProductById = useCallback(async (id) => {
    try {
      setLoading(true);
      const res = await privateApiClient.get(`/products/${id}`);
      setSingleProduct(res.data);
      setLoading(false);
      return res.data;
    } catch (err) {
      setError("Failed to fetch product");
      setLoading(false);
      return null;
    }
  }, []);

  // ✅ Create product
  const createProduct = useCallback(async (data) => {
    try {
      setLoading(true);
      const res = await privateApiClient.post("/products", data);
      setProducts((prev) => [...prev, res.data]);
      setLoading(false);
    } catch (err) {
      setError("Failed to create product");
      setLoading(false);
    }
  }, []);

  // ✅ Update product
  const updateProduct = useCallback(async (id, data) => {
    try {
      setLoading(true);
      const res = await privateApiClient.put(`/products/${id}`, data);
      setProducts((prev) =>
        prev.map((p) => (p._id === id ? res.data : p))
      );
      setSingleProduct(res.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to update product");
      setLoading(false);
    }
  }, []);

  /** ------------------ ORDER FUNCTIONS ------------------ **/

  // ✅ Fetch all orders
  const getOrders = useCallback(async () => {
    try {
      setLoading(true);
      const res = await privateApiClient.get(API_ORDER_URL);
      setOrders(res.data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch orders");
      setLoading(false);
    }
  }, []);

  // ✅ Fetch a single order by ID
  const getOrderById = useCallback(async (id) => {
    try {
      setLoading(true);
      const res = await privateApiClient.get(`${API_ORDER_URL}/${id}`);
      setSingleOrder(res.data);
      setLoading(false);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch order");
      setLoading(false);
      return null;
    }
  }, []);

  // ✅ Create a new order
  const createOrder = useCallback(async (orderData) => {
    try {
      setLoading(true);
      const res = await privateApiClient.post(API_ORDER_URL, orderData);
      setOrders((prev) => [...prev, res.data]);
      setLoading(false);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create order");
      setLoading(false);
      return null;
    }
  }, []);

  // ✅ Update order
  const updateOrder = useCallback(async (id, updates) => {
    try {
      setLoading(true);
      const res = await privateApiClient.put(`${API_ORDER_URL}/${id}`, updates);
      setOrders((prev) =>
        prev.map((o) => (o._id === id ? res.data : o))
      );
      if (singleOrder?._id === id) setSingleOrder(res.data);
      setLoading(false);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update order");
      setLoading(false);
      return null;
    }
  }, [singleOrder]);

  /** ------------------ PAYMENT FUNCTIONS ------------------ **/

  // ✅ Fetch all payments
  const getPayments = useCallback(async () => {
    try {
      setLoading(true);
      const res = await privateApiClient.get(API_PAYMENT_URL);
      setPayments(res.data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch payments");
      setLoading(false);
    }
  }, []);

  // ✅ Fetch single payment by ID
  const getPaymentById = useCallback(async (id) => {
    try {
      setLoading(true);
      const res = await privateApiClient.get(`${API_PAYMENT_URL}/${id}`);
      setSinglePayment(res.data);
      setLoading(false);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch payment");
      setLoading(false);
      return null;
    }
  }, []);

  // ✅ Update payment (e.g., status)
  const updatePayment = useCallback(async (id, updates) => {
    try {
      setLoading(true);
      const res = await privateApiClient.put(`${API_PAYMENT_URL}/${id}`, updates);
      setPayments((prev) =>
        prev.map((p) => (p._id === id ? res.data : p))
      );
      if (singlePayment?._id === id) setSinglePayment(res.data);
      setLoading(false);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update payment");
      setLoading(false);
      return null;
    }
  }, [singlePayment]);

  /** ------------------ AUTO LOAD ------------------ **/
  useEffect(() => {
    fetchProducts();
    getOrders();
    getPayments();
  }, [fetchProducts, getOrders, getPayments]);

  return {
    // Products
    products,
    singleProduct,
    fetchProducts,
    getProductById,
    createProduct,
    updateProduct,

    // Orders
    orders,
    singleOrder,
    getOrders,
    getOrderById,
    createOrder,
    updateOrder,

    // Payments
    payments,
    singlePayment,
    getPayments,
    getPaymentById,
    updatePayment,

    // Shared
    loading,
    error,
  };
};

export default useStaff;
