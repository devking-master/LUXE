// src/components/ProtectRoutes.jsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = ({ allowedRoles }) => {
  const { user, loading } = useAuth();

  // Wait until auth check is done
  if (loading) {
    return <div>Loading...</div>; // or a spinner
  }

  // If no user → redirect to login
  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  // If user exists but role not allowed → redirect to unauthorized
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
