import React from "react";
import { Navigate } from "react-router-dom";

const Protected = ({ children }) => {
  const isAuthenticated = Boolean(localStorage.getItem("site-token"));

  if (isAuthenticated) {
    return children;
  }

  return <Navigate to="/login" />;
};

export default Protected;
