import React from "react";
import "./Header.css";
import { useEffect } from "react";
import { useApiData } from "../../context/ApiDataContext";

const Header = () => {
  const token = localStorage.getItem("site-token");
  const tokenType = localStorage.getItem("site-token-type");

  const handleLogOut = () => {
    localStorage.clear();
  };

  const apiData = useApiData();

  useEffect(() => {
    // Check if apiData is available
    if (apiData) {
      // Now you can safely use apiData
      console.log(apiData);
    }
  }, [apiData]);

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
      {apiData ? (
        // Render data here when it's available
        apiData.map((item) => <div key={item.id}>{item.name}</div>)
      ) : (
        // Render loading state or handle error
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Header;
