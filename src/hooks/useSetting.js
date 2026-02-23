// src/hooks/useSettings.js
import { useState, useEffect } from "react";
import { privateApiClient } from "../lib/client";

const useSettings = () => {
  const [settings, setSettings] = useState({
    firstname: "",
    lastname: "",
    email: "",
    role: "", // optional, if you want admin to see role
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");

  // Fetch current user settings (from /profile)
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        const res = await privateApiClient.get("/auth/profile");

        console.log("Profile response:", res.data); // 👈 check structure

        // If backend sends { user: {...} }, extract correctly
        const user = res.data.user || res.data;

        setSettings({
          firstname: user.firstname || "",
          lastname: user.lastname || "",
          email: user.email || "",
          role: user.role || "",
          password: "", // don't prefill password
        });

        setLoading(false);
      } catch (err) {
        console.error("Fetch settings error:", err);
        setError("Failed to fetch settings");
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  // Update user settings (PUT /profile)
  const updateSettings = async () => {
    try {
      setLoading(true);
      const res = await privateApiClient.put("/auth/profile", {
        firstname: settings.firstname,
        lastname: settings.lastname,
        email: settings.email, // only if backend allows updating email
      });

      setSuccess("Settings updated successfully!");
      setError(null);
      setLoading(false);

      return res.data;
    } catch (err) {
      console.error("Update settings error:", err);
      setError("Failed to update settings");
      setLoading(false);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return {
    settings,
    loading,
    error,
    success,
    handleChange,
    updateSettings,
  };
};

export default useSettings;
