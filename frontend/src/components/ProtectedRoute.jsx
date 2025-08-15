import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const role = localStorage.getItem("role");

  if (!role) {
    // Not logged in
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(role)) {
    // Role not allowed
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
