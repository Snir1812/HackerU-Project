import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../../utils/api";
import "./Form.css";

const OrderForm = () => {
  const { id } = useParams();
  const [userID, setUserID] = useState("");
  const [orderStatus, setOrderStatus] = useState(1);
  const [orderItems, setOrderItems] = useState([]);
  const [itemsMarkedForDeletion, setItemsMarkedForDeletion] = useState([]);
  const [apiError, setApiError] = useState("");
  const [formValid, setFormValid] = useState(false);
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
              setApiError(error.response.data);
            }
          } else {
            setApiError("An error occurred");
          }
        });
    }
  }, [id]);

  useEffect(() => {
    // Check if the main fields are filled and at least one product is added
    const isMainFieldsFilled =
      userID &&
      orderStatus &&
      orderItems.length > 0 &&
      !orderItems.some(
        (item) => !item.productID || !item.pricePerItem || !item.quantity
      );

    setFormValid(isMainFieldsFilled);
  }, [userID, orderStatus, orderItems]);

  const handelCancel = () => {
    navigate("../order");
  };

  const handelSubmit = (e) => {
    e.preventDefault();

    if (!formValid) {
      setApiError("Please fill in all fields and add at least one product.");
      return;
    }

    // Continue with the submission logic
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
    const action = id ? "updated" : "created";

    if (itemsMarkedForDeletion.length > 0) {
      itemsMarkedForDeletion.forEach((itemID) => {
        api.delete(`OrderItem/${itemID}`).catch((ex) => setApiError(ex));
      });
    }

    api[verb]("order", newItem)
      .then((res) => {
        navigate("../order");
        alert(`Order ${action} successfully`);
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
            setApiError(error.response.data);
          }
        } else {
          setApiError("An error occurred");
        }
      });

    setItemsMarkedForDeletion([]);
  };

  const orderStatusOptions = [
    { value: "1", label: "Ordered" },
    { value: "2", label: "Out For Delivery" },
    { value: "3", label: "Delivered" },
  ];

  const removeOrderItem = (index, item) => {
    if (item.id) {
      setItemsMarkedForDeletion((prevItems) => [...prevItems, item.id]);
      const updatedItems = [...orderItems];
      updatedItems.splice(index, 1);
      setOrderItems(updatedItems);
    } else {
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
      <h3>Order Form</h3>
      <form className="form" onSubmit={handelSubmit}>
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
            <button type="button" onClick={() => removeOrderItem(index, item)}>
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={addOrderItem}>
          Add Product
        </button>

        <div className="buttonsDiv">
          <button type="submit" disabled={!formValid}>
            Save
          </button>
          <button type="button" onClick={handelCancel}>
            Cancel
          </button>
        </div>
      </form>
      {apiError && <p className="error">{apiError}</p>}
    </>
  );
};

export default OrderForm;
