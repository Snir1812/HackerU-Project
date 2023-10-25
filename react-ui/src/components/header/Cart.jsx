import React, { useEffect, useState } from "react";
import "./Cart.css";
import { AiOutlineClose } from "react-icons/ai";
import api from "../../utils/api";

const Cart = () => {
  const [cartData, setCartData] = useState([]);
  const [userID, setUserID] = useState(""); // Assuming you have the userID in state
  const [apiError, setApiError] = useState(""); // Add API error state

  useEffect(() => {
    const storedCartData = JSON.parse(localStorage.getItem("cart")) || [];
    // console.log(storedCartData);
    const storedUserID = localStorage.getItem("site-token-userID") || "";
    // console.log(storedUserID);
    setCartData(storedCartData);
    setUserID(storedUserID);
  }, []);

  const removeFromCart = (productId) => {
    // Find the index of the item to remove in the cartData array
    const indexToRemove = cartData.findIndex((item) => item.id === productId);

    if (indexToRemove !== -1) {
      // Create a copy of the cart data, remove the item at the found index, and update local storage
      const updatedCart = [...cartData];
      updatedCart.splice(indexToRemove, 1);
      localStorage.setItem("cart", JSON.stringify(updatedCart));

      // Update the cart data in the component state
      setCartData(updatedCart);
    }
  };

  const handleOrder = () => {
    if (cartData.length === 0) {
      // Check if the cart is empty and provide feedback to the user
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
        console.log(res.data);
        localStorage.removeItem("cart");
        window.location.reload();
      })
      .catch((ex) => {
        setApiError(ex.response ? ex.response.data : "An error occurred");
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
            <div className="cartItem" key={item.id}>
              {item.productName} - {item.price}
              <br />
              {item.quantity}
              <br />
              <button onClick={() => removeFromCart(item.id)}>
                <AiOutlineClose />
              </button>
            </div>
          ))
        )}
      </div>
      {cartData.length !== 0 && <button onClick={handleOrder}>To order</button>}
      {apiError && <p className="error">{apiError}</p>}
    </div>
  );
};

export default Cart;
