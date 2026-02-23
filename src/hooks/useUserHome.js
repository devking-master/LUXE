// src/hooks/useUserHome.js
import { useEffect, useState } from "react";
import { privateApiClient } from "../lib/client";

const useUserHome = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [productsRes, ordersRes] = await Promise.all([
          privateApiClient.get("/products"),
          privateApiClient.get("/orders/my-orders"),
        ]);

        // ✅ Normalize products
        const productsData = Array.isArray(productsRes.data)
          ? productsRes.data
          : productsRes.data.products || [];

        // ✅ Normalize orders
        const ordersData = Array.isArray(ordersRes.data)
          ? ordersRes.data
          : ordersRes.data.orders || [];

        setProducts(productsData);
        setOrders(ordersData);
      } catch (err) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { products, orders, loading, error };
};

export default useUserHome;
