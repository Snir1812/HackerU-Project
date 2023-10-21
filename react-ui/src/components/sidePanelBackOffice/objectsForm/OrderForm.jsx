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
  const [orderItems, setOrderItems] = useState([]);
  const [itemsMarkedForDeletion, setItemsMarkedForDeletion] = useState([]);
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
          if (item.orderItems) {
            setOrderItems(item.orderItems);
          }
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

    if (!userID || !orderStatus) {
      setApiError("Please fill out all required fields");
      return;
    }

    // Check if any of the order items are incomplete
    const incompleteItems = orderItems.filter(
      (item) => !item.productID || !item.pricePerItem || item.quantity <= 0
    );

    if (incompleteItems.length > 0) {
      setApiError("Please fill out all product details");
      return;
    }

    // Filter out the marked items from orderItems
    const updatedOrderItems = orderItems.filter(
      (item, index) => !itemsMarkedForDeletion.includes(item.id)
    );

    const newItem = {
      id: id || 0,
      userID,
      orderStatus: parseFloat(orderStatus),
      orderItems: updatedOrderItems,
    };

    const verb = id ? "put" : "post";

    console.log(newItem);

    // If there are items marked for deletion, delete them from the API
    if (itemsMarkedForDeletion.length > 0) {
      itemsMarkedForDeletion.forEach((itemID) => {
        // console.log(itemID);
        api.delete(`OrderItem/${itemID}`).catch((ex) => console.log(ex));
      });
    }

    api[verb]("order", newItem)
      .then((res) => {
        console.log(res.data);
        navigate("../order");
      })
      .catch((ex) => {
        setApiError(ex.response ? ex.response.data : "An error occurred");
      });

    // Clear the items marked for deletion
    setItemsMarkedForDeletion([]);
  };

  const orderStatusOptions = [
    { value: "1", label: "Ordered" },
    { value: "2", label: "Out For Delivery" },
    { value: "3", label: "Delivered" },
  ];

  const removeOrderItem = (index, item) => {
    if (item.id) {
      // This is a product from the API, mark it for deletion
      setItemsMarkedForDeletion((prevItems) => [...prevItems, item.id]);
      const updatedItems = [...orderItems];
      updatedItems.splice(index, 1);
      setOrderItems(updatedItems);
    } else {
      // This is a new product added by the user, just remove it from the state
      const updatedItems = [...orderItems];
      updatedItems.splice(index, 1);
      setOrderItems(updatedItems);
    }
  };

  const addOrderItem = () => {
    const newItem = {
      productID: "",
      productName: "",
      pricePerItem: "",
      quantity: 1,
    };
    setOrderItems([...orderItems, newItem]);
  };

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
        {orderItems.map((item, index) => (
          <div className="orderItem" key={index}>
            <div className="formItem">
              <div className="formLabel">Product ID</div>
              <input
                type="number"
                value={item.productID}
                onChange={(e) => {
                  const updatedItems = [...orderItems];
                  updatedItems[index].productID = e.target.value;
                  setOrderItems(updatedItems);
                }}
              />
            </div>
            <div className="formItem">
              <div className="formLabel">Price Per Item</div>
              <input
                type="number"
                value={item.pricePerItem}
                onChange={(e) => {
                  const updatedItems = [...orderItems];
                  updatedItems[index].pricePerItem = e.target.value;
                  setOrderItems(updatedItems);
                }}
              />
            </div>
            <div className="formItem">
              <div className="formLabel">Quantity</div>
              <input
                type="number"
                value={item.quantity}
                onChange={(e) => {
                  const updatedItems = [...orderItems];
                  updatedItems[index].quantity = e.target.value;
                  setOrderItems(updatedItems);
                }}
              />
            </div>
            <button onClick={() => removeOrderItem(index, item)}>Remove</button>
          </div>
        ))}
        <button onClick={addOrderItem}>Add Product</button>

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