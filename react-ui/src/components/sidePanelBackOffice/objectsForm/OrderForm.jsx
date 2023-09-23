import React, { useEffect } from "react";
import { useState } from "react";
import api from "../../../utils/api";
import { useNavigate, useParams } from "react-router-dom";

const OrderForm = () => {
  const { id } = useParams();
  //const [id, setId] = useState("");
  const [userID, setUserID] = useState("");
  const [orderStatus, setOrderStatus] = useState("");
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

    const newItem = {
      id: id || 0,
      userID,
      orderStatus,
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

  return (
    <>
      <h2>Product Form</h2>
      <div className="form" onSubmit={handelSubmit}>
        <div className="formItem">
          <div className="formLabel">User ID</div>
          <input
            type="number"
            required
            value={userID}
            onChange={(e) => setUserID(e.target.value)}
          />
        </div>
        <div className="formItem">
          <div className="formLabel">Order Status</div>
          <input
            type="number"
            required
            value={orderStatus}
            onChange={(e) => setOrderStatus(e.target.value)}
          />
        </div>
        <div className="formItem">
          <div className="formLabel">Total Price</div>
          <input
            type="number"
            required
            value={totalPrice}
            onChange={(e) => setTotalPrice(e.target.value)}
          />
        </div>
      </div>
      {apiError && <p className="error">{apiError}</p>}{" "}
      {/* Display API error message */}
      <button type="submit" onClick={handelSubmit}>
        Save
      </button>
      <button onClick={handelCancel}>Cancel</button>
    </>
  );
};

export default OrderForm;
