import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export const apiClient = axios.create({
  baseURL: `${baseURL}/api/v1`,
});

// Private client with interceptor
export const privateApiClient = axios.create({
  baseURL: `${baseURL}/api/v1`,
});

// Attach token dynamically before each request
privateApiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
