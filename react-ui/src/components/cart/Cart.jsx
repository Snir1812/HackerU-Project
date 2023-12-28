import React, { useEffect, useState } from "react";
import "./Cart.css";
import { AiOutlineClose } from "react-icons/ai";
import api from "../../utils/api";

const Cart = () => {
  const [cartData, setCartData] = useState([]);
  const [userID, setUserID] = useState("");
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    const storedCartData = JSON.parse(localStorage.getItem("cart")) || [];
    const storedUserID = localStorage.getItem("site-token-userID") || "";
    setCartData(storedCartData);
    setUserID(storedUserID);
  }, []);

  const removeFromCart = (productId) => {
    const updatedCart = cartData.filter((item) => item.productID !== productId);
    updateCart(updatedCart);
  };

  const updateQuantity = (productId, newQuantity) => {
    const updatedCart = cartData.map((item) => {
      if (item.productID === productId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    updateCart(updatedCart);
  };

  const updateCart = (updatedCart) => {
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartData(updatedCart);
  };

  const handleOrder = () => {
    if (cartData.length === 0) {
      setApiError(
        "Your cart is empty. Add items to your cart before placing an order"
      );
      return;
    }

    const isConfirmed = window.confirm(
      "Are you sure you want to place the order?"
    );

    if (!isConfirmed) {
      return;
    }

    const orderItems = cartData.map((item) => item);

    const orderData = {
      userID: userID,
      orderItems: orderItems,
    };

    api
      .post("Order", orderData)
      .then((res) => {
        localStorage.removeItem("cart");

        setCartData([]);

        alert("Order successfully created");

        window.location.reload();
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          setApiError(error.response.data);
        } else {
          setApiError("An error occurred");
        }
      });
  };

  return (
    <div className="cartDiv">
      <h2>Your Cart</h2>
      <div className="cartItemList" key={cartData.length}>
        {cartData.length === 0 ? (
          <div className="cartItem" key={"empty-cart"}>
            Your cart is empty.
          </div>
        ) : (
          cartData.map((item) => (
            <div className="cartItemDiv" key={item.productID}>
              <span className="cartItem"> {item.productName}</span>
              <div>
                <span className="cartItem"> {item.pricePerItem}$</span>
                <button
                  className="quantityButton"
                  onClick={() =>
                    updateQuantity(item.productID, item.quantity - 1)
                  }
                >
                  -
                </button>
                <span className="cartItem"> {item.quantity}</span>
                <button
                  className="quantityButton"
                  onClick={() =>
                    updateQuantity(item.productID, item.quantity + 1)
                  }
                >
                  +
                </button>
                <button
                  className="cartRemoveButton"
                  onClick={() => removeFromCart(item.productID)}
                >
                  <AiOutlineClose />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      {cartData.length !== 0 && (
        <button className="cartOrderButton" onClick={handleOrder}>
          To order
        </button>
      )}
      {apiError && <p className="error">{apiError}</p>}
    </div>
  );
};

export default Cart;
