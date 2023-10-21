import React, { useEffect, useState } from "react";
import "./Header.css";
import { useCategoryData } from "../../context/CategoryDataContext";
import { ProductDataProvider } from "../../context/ProductDataContext";
import { NavLink } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { render } from "@testing-library/react";
import Cart from "./Cart";
import { BsCartDash } from "react-icons/bs";

const Header = () => {
  const token = localStorage.getItem("site-token");
  const tokenType = localStorage.getItem("site-token-type");

  const [isCartOpen, setCartOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0); // Initialize cart item count

  const handleLogOut = () => {
    localStorage.clear();
    window.location.reload();
  };

  const categoryData = useCategoryData();

  const toggleCart = () => {
    setCartOpen(!isCartOpen);
  };

  // Update cart item count whenever the cart data changes
  useEffect(() => {
    const storedCartData = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItemCount(storedCartData.length);
  }, []);

  return (
    <div className="header">
      <NavLink to="/" className="headerLink">
        Home
      </NavLink>
      {categoryData ? (
        // Render data here when it's available
        categoryData.map((item) => (
          <NavLink
            to={`/products/${item.id}`}
            className="headerLink"
            key={item.id}
          >
            {item.name}
          </NavLink>
        ))
      ) : (
        // Render loading state or handle error
        <p>Loading...</p>
      )}
      {!token && (
        <NavLink to="/login" className="headerLink">
          Log in
        </NavLink>
      )}
      {token && (
        <NavLink className="headerLink" onClick={handleLogOut}>
          Log out
        </NavLink>
      )}
      {tokenType === "Admin" && (
        <NavLink to="/backoffice" className="headerLink">
          Back office
        </NavLink>
      )}
      <button className="cartBtnDiv" onClick={toggleCart}>
        <BsCartDash className="cartBtn" />
        {/* {cartItemCount > 0 && (
          <span className="cartBadge">{cartItemCount}</span>
        )} */}
      </button>
      {isCartOpen && <Cart />}
    </div>
  );
};

export default Header;
