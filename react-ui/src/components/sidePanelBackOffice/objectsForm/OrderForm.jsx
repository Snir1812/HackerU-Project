import React, { useEffect } from "react";
import { useState } from "react";
import api from "../../../utils/api";
import { useNavigate, useParams } from "react-router-dom";
import "./Form.css";

const OrderForm = () => {
  const { id } = useParams();
  //const [id, setId] = useState("");
  const [userID, setUserID] = useState("");
  const [orderStatus, setOrderStatus] = useState(1);
  const [totalPrice, setTotalPrice] = useState("");
  const [apiError, setApiError] = useState(""); // Add API error state

  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      api
        .get(`order/${id}`)
        .then((res) => {
          const item = res.data;

          setUserID(item.userID);
          setOrderStatus(item.orderStatus);
          setTotalPrice(item.totalPrice);
        })
        .catch((ex) => {
          setApiError(ex.response ? ex.response.data : "An error occurred");
        });
    }
  }, [id]);

  const handelCancel = () => {
    navigate("../order");
  };

  const handelSubmit = (e) => {
    e.preventDefault();

    if (!userID || !orderStatus || !totalPrice) {
      setApiError("Please fill out all required fields");
      return;
    }

    const newItem = {
      id: id || 0,
      userID,
      orderStatus: parseFloat(orderStatus), // Parse orderStatus as a float
      totalPrice,
    };

    const verb = id ? "put" : "post";

    console.log(newItem);

    api[verb]("order", newItem)
      .then((res) => {
        console.log(res.data);
        navigate("../order");
      })
      .catch((ex) => {
        setApiError(ex.response ? ex.response.data : "An error occurred");
      });
  };

  // Options for the order status dropdown
  const orderStatusOptions = [
    { value: "1", label: "Ordered" },
    { value: "2", label: "Out For Delivery" },
    { value: "3", label: "Delivered" },
  ];

  return (
    <>
      <h2>Order Form</h2>
      <div className="form" onSubmit={handelSubmit}>
        <div className="formItem">
          <div className="formLabel">User ID</div>
          <input
            type="number"
            value={userID}
            onChange={(e) => setUserID(e.target.value)}
          />
        </div>
        <div className="formItem">
          <div className="formLabel">Order Status</div>
          <select
            value={orderStatus}
            onChange={(e) => setOrderStatus(e.target.value)}
          >
            {orderStatusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="formItem">
          <div className="formLabel">Total Price</div>
          <input
            type="number"
            value={totalPrice}
            onChange={(e) => setTotalPrice(e.target.value)}
          />
        </div>
        <div className="buttonsDiv">
          <button type="submit" onClick={handelSubmit}>
            Save
          </button>
          <button onClick={handelCancel}>Cancel</button>
        </div>
      </div>
      {apiError && <p className="error">{apiError}</p>}{" "}
      {/* Display API error message */}
    </>
  );
};

export default OrderForm;
