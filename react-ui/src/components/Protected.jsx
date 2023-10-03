import React from "react";
import { Navigate } from "react-router-dom";

const Protected = ({ children }) => {
  const isAuthenticated = Boolean(localStorage.getItem("site-token"));
  const tokenType = localStorage.getItem("site-token-type");

  if (isAuthenticated && tokenType === "Admin") {
    return children;
  }

  return <Navigate to="/login" />;
};

export default Protected;
