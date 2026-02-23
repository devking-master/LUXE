import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/payments"; // adjust your backend URL

export default function usePayments() {
  const [payments, setPayments] = useState([]);
  const [payment, setPayment] = useState(null); // single payment
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ✅ Fetch all payments
  const getPayments = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setPayments(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch payments");
    } finally {
      setLoading(false);
    }
  }, []);

  // ✅ Fetch single payment by ID
  const getPaymentById = useCallback(async (id) => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/${id}`);
      setPayment(res.data);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch payment");
    } finally {
      setLoading(false);
    }
  }, []);

  // ✅ Update payment (e.g., status)
  const updatePayment = useCallback(async (id, updates) => {
    try {
      setLoading(true);
      const res = await axios.put(`${API_URL}/${id}`, updates);
      setPayments((prev) =>
        prev.map((p) => (p._id === id ? res.data : p))
      );
      if (payment?._id === id) setPayment(res.data);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update payment");
    } finally {
      setLoading(false);
    }
  }, [payment]);

  // ✅ Delete payment
  const deletePayment = useCallback(async (id) => {
    try {
      setLoading(true);
      await axios.delete(`${API_URL}/${id}`);
      setPayments((prev) => prev.filter((p) => p._id !== id));
      if (payment?._id === id) setPayment(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete payment");
    } finally {
      setLoading(false);
    }
  }, [payment]);

  return {
    payments,
    payment,
    loading,
    error,
    getPayments,
    getPaymentById,
    updatePayment,
    deletePayment,
  };
}
