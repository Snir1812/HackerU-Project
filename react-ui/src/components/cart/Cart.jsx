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
    const updatedCart = cartData.filter((item) => item.id !== productId);
    updateCart(updatedCart);
  };

  const updateQuantity = (productId, newQuantity) => {
    const updatedCart = cartData.map((item) => {
      if (item.id === productId) {
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

        window.location.reload();
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          const errorResponse = error.response.data;
          if (errorResponse.errors) {
            const errorMessages = Object.values(errorResponse.errors);
            const allErrors = errorMessages.flat();
            setApiError(allErrors.join(" "));
          } else if (errorResponse.message) {
            setApiError(errorResponse.message);
          } else {
            setApiError("An error occurred");
          }
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
          <div className="cartItem">Your cart is empty.</div>
        ) : (
          cartData.map((item) => (
            <div className="cartItemDiv" key={item.id}>
              <span className="cartItem"> {item.productName}</span>
              <div>
                <span className="cartItem"> {item.pricePerItem}$</span>
                <button
                  className="quantityButton"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  -
                </button>
                <span className="cartItem"> {item.quantity}</span>
                <button
                  className="quantityButton"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>
                <button
                  className="cartRemoveButton"
                  onClick={() => removeFromCart(item.id)}
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
