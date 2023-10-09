import React from "react";
import "./Header.css";
import { useEffect } from "react";
import { useCategoryData } from "../../context/CategoryDataContext";
const Header = () => {
  const token = localStorage.getItem("site-token");
  const tokenType = localStorage.getItem("site-token-type");

  const handleLogOut = () => {
    localStorage.clear();
  };

  const categoryData = useCategoryData();

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
      {categoryData ? (
        // Render data here when it's available
        categoryData.map((item) => <div key={item.id}>{item.name}</div>)
      ) : (
        // Render loading state or handle error
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Header;
