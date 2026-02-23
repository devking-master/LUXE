import { useState, useCallback } from "react";
import { privateApiClient } from "../lib/client";

export default function useUsers() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ✅ Fetch all users
  const getUsers = useCallback(async () => {
    try {
      setLoading(true);
      const res = await privateApiClient.get("/auth/users");

      const data = Array.isArray(res.data)
        ? res.data
        : res.data.users || res.data.user || [];

      setUsers(data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  }, []);

  // ✅ Fetch single user by ID
  const getUserById = useCallback(async (id) => {
    try {
      setLoading(true);
      const res = await privateApiClient.get(`/auth/users/${id}`);
      setUser(res.data);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch user");
    } finally {
      setLoading(false);
    }
  }, []);

  // ✅ Update user (generic updates)
  const updateUser = useCallback(
    async (id, updates) => {
      try {
        setLoading(true);
        const res = await privateApiClient.put(`/auth/users/${id}`, updates);

        setUsers((prev) =>
          prev.map((u) => (u._id === id ? res.data : u))
        );
        if (user?._id === id) setUser(res.data);

        return res.data;
      } catch (err) {
        setError(err.response?.data?.message || "Failed to update user");
      } finally {
        setLoading(false);
      }
    },
    [user]
  );

  // ✅ Update user role (admin only)
  const updateUserRole = useCallback(
    async (id, role) => {
      try {
        setLoading(true);
        const res = await privateApiClient.put(`/auth/${id}/role`, { role });

        setUsers((prev) =>
          prev.map((u) => (u._id === id ? res.data.user : u))
        );
        if (user?._id === id) setUser(res.data.user);

        return res.data.user;
      } catch (err) {
        setError(err.response?.data?.message || "Failed to update role");
      } finally {
        setLoading(false);
      }
    },
    [user]
  );

  // ✅ Delete user
  const deleteUser = useCallback(
    async (id) => {
      try {
        setLoading(true);
        await privateApiClient.delete(`/auth/users/${id}`);

        setUsers((prev) => prev.filter((u) => u._id !== id));
        if (user?._id === id) setUser(null);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to delete user");
      } finally {
        setLoading(false);
      }
    },
    [user]
  );

  return {
    users,
    user,
    loading,
    error,
    getUsers,
    getUserById,
    updateUser,
    updateUserRole, 
    deleteUser,
  };
}
