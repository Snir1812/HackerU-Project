import React, { useEffect, useState } from "react";
import api from "../../../utils/api";
import "./List.css";
import { Link } from "react-router-dom";

const OrderList = () => {
  const [items, setItems] = useState([]);

  const handelDelete = (id) => {
    if (!window.confirm("Are you sure ? ")) {
      return;
    }
    api
      .delete(`Order/${id}`)
      .then(() => {
        setItems(items.filter((i) => i.id !== id));
      })
      .catch((ex) => console.log(ex));
  };

  useEffect(() => {
    api
      .get("Order")
      .then((result) => {
        console.log(result.data);
        setItems(result.data);
      })
      .catch((ex) => console.log(ex));
  }, []);

  // Function to format UTC date to YYYY-MM-DD
  const formatDate = (utcDate) => {
    const date = new Date(utcDate);
    const year = date.getUTCFullYear();
    const month = (date.getUTCMonth() + 1).toString().padStart(2, "0"); // Months are 0-indexed
    const day = date.getUTCDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Function to map orderStatus values to their respective labels
  const mapOrderStatus = (statusValue) => {
    switch (statusValue) {
      case 1:
        return "Ordered";
      case 2:
        return "Out For Delivery";
      case 3:
        return "Delivered";
      default:
        return "";
    }
  };

  return (
    <div className="listPage">
      <h3>Orders List</h3>
      <Link to="new">
        <button className="newButton">Add new order</button>
      </Link>
      <div className="list">
        <div className="itemListUp">ID</div>
        <div className="itemListUp">User ID</div>
        <div className="itemListUp">Order Date</div>
        <div className="itemListUp">Order Status</div>
        <div className="itemListUp">Total Price</div>
        <div className="itemListUp">Actions</div>
      </div>
      <div>
        {items.map((item) => (
          <div className="list">
            <div className="itemList">{item.id}</div>
            <div className="itemList">{item.userID}</div>
            <div className="itemList">{formatDate(item.orderDate)}</div>
            {/* Format the date */}
            <div className="itemList">{mapOrderStatus(item.orderStatus)}</div>
            <div className="itemList">{item.totalPrice}</div>
            <div className="itemListButtons">
              <Link to={`edit/${item.id}`} className="noUnderline">
                <button className="button edit">Edit</button>
              </Link>
              <button
                className="button delete"
                onClick={() => handelDelete(item.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderList;
