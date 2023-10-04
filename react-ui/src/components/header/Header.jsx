import React from "react";
import "./Header.css";

const Header = () => {
  const token = localStorage.getItem("site-token");
  const tokenType = localStorage.getItem("site-token-type");

  const handleLogOut = () => {
    localStorage.clear();
  };

  return (
    <div className="header">
      <a href="/">Home</a>
      {!token && <a href="/login">Log in</a>}
      {token && (
        <a href=" " onClick={handleLogOut}>
          Log out
        </a>
      )}
      {tokenType === "Admin" && <a href="/backoffice">Back office</a>}
    </div>
  );
};

export default Header;
