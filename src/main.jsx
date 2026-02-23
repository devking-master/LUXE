import { StrictMode } from "react";
import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router"; 
import { AuthProvider } from "./AuthContext/AuthContext.jsx"; 
import { CartProvider } from "./AuthContext/CartContext.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>   {/* 👈 wrap the app with CartProvider */}
        <RouterProvider router={router} />
      </CartProvider>
    </AuthProvider>
  </StrictMode>
);
