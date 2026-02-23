import { useState } from "react";
import { useAuth } from "./useAuth";

export default function useLogin() {
  const { login } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (email, password) => {
    setLoading(true);
    setError("");
    try {
      const user = await login(email, password); // ✅ just return user
      return user; // return user object so component can decide what to do
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "Login failed");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, loading, error };
}
