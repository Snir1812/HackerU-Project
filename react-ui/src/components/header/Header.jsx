import React from "react";
import "./Header.css";

const Header = () => {
  const tokenType = localStorage.getItem("site-token-type");

  return (
    <div className="header">
      <a href="/">Home</a>
      <a href="/login">Login</a>
      {tokenType === "Admin" && <a href="/backoffice">Back office</a>}
    </div>
  );
};

export default Header;
