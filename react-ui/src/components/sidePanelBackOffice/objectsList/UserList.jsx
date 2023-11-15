import React, { useEffect, useState } from "react";
import api from "../../../utils/api";
import "./List.css";
import { Link } from "react-router-dom";

const UserList = () => {
  const [items, setItems] = useState([]);

  const handelDelete = (id) => {
    if (!window.confirm("Are you sure ?")) {
      return;
    }
    api
      .delete(`user/${id}`)
      .then(() => {
        setItems(items.filter((i) => i.id !== id));
      })
      .catch((ex) => console.log(ex));
  };

  useEffect(() => {
    api
      .get("User")
      .then((result) => {
        setItems(result.data);
      })
      .catch((ex) => console.log(ex));
  }, []);

  const userType = (statusValue) => {
    switch (statusValue) {
      case 0:
        return "Unknown";
      case 999:
        return "Admin";
      default:
        return "";
    }
  };

  return (
    <div className="listPage">
      <h3>Users List</h3>
      <Link to="new" className="newButtonDiv">
        <button className="newButton">Add new user</button>
      </Link>
      <div className="list">
        <div className="itemListUp">ID</div>
        <div className="itemListUp">First Name</div>
        <div className="itemListUp">Last Name</div>
        <div className="itemListUp">Type</div>
        <div className="itemListUp">Email</div>
        <div className="itemListUp">User Name</div>
        <div className="itemListUp">Password</div>
        <div className="itemListUp">Address</div>
        <div className="itemListUp">Phone Number</div>
        <div className="itemListUp">Actions</div>
      </div>
      {items.map((item) => (
        <div className="list" key={item.id}>
          <div className="itemList">{item.id}</div>
          <div className="itemList">{item.firstName}</div>
          <div className="itemList">{item.lastName}</div>
          <div className="itemList">{userType(item.type)}</div>
          <div className="itemList">{item.email}</div>
          <div className="itemList">{item.userName}</div>
          <div className="itemList">{item.password}</div>
          <div className="itemList">{item.address}</div>
          <div className="itemList">{item.phoneNumber}</div>
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
  );
};

export default UserList;
