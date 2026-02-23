// src/hooks/useProducts.js
import { useState, useEffect } from "react";
import { privateApiClient } from "../lib/client";

export default function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Fetch all products
  const fetchProducts = async () => {
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
  };

  // ✅ Get single product
  const getProductById = async (id) => {
    try {
      const res = await privateApiClient.get(`/products/${id}`);
      return res.data;
    } catch (err) {
      setError("Failed to fetch product");
      return null;
    }
  };

  // ✅ Create product
  const createProduct = async (data) => {
    try {
      const res = await privateApiClient.post("/products", data);
      setProducts((prev) => [...prev, res.data]);
    } catch (err) {
      setError("Failed to create product");
    }
  };

  // ✅ Update product
  const updateProduct = async (id, data) => {
    try {
      const res = await privateApiClient.put(`/products/${id}`, data);
      setProducts((prev) =>
        prev.map((p) => (p._id === id ? res.data : p))
      );
    } catch (err) {
      setError("Failed to update product");
    }
  };

  // ✅ Delete product
  const deleteProduct = async (id) => {
    try {
      await privateApiClient.delete(`/products/${id}`);
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      setError("Failed to delete product");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    loading,
    error,
    fetchProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
  };
}
