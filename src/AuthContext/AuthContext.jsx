// src/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";
import { apiClient, privateApiClient } from "../lib/client.js";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // stores user details
  const [loading, setLoading] = useState(true);

  // Check token on page reload
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      privateApiClient
        .get("/auth/profile")
        .then((res) => {
          setUser(res.data.user);
        })
        .catch(() => {
          localStorage.removeItem("token");
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  // Login
  const login = async (email, password) => {
    const res = await apiClient.post("/auth/login", { email, password });
    localStorage.setItem("token", res.data.token);
    setUser(res.data.user);
    return res.data.user;
  };

  // Register
  const register = async (data) => {
    const res = await apiClient.post("/auth/register", data);
    return res.data;
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
