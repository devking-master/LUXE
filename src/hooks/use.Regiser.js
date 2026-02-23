import { useState } from "react";
import { useAuth } from "./useAuth"; 

export default function useRegister() {
  const { register } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (data) => {
    setLoading(true);
    setError("");
    try {
      await register(data);
      return { success: true }; // ✅ let component handle success
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "Registration failed");
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  return { handleRegister, loading, error };
}
