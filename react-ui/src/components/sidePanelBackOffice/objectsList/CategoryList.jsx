import React, { useEffect, useState } from "react";
import api from "../../../utils/api";
import "./List.css";
import { Link } from "react-router-dom";

const CategoryList = () => {
  const [items, setItems] = useState([]);

  const handelDelete = (id) => {
    if (
      !window.confirm(
        "Are you sure ? You will also delete all products that use this category "
      )
    ) {
      return;
    }
    api
      .delete(`Category/${id}`)
      .then(() => {
        setItems(items.filter((i) => i.id !== id));
      })
      .catch((ex) => console.log(ex));
  };

  useEffect(() => {
    api
      .get("Category")
      .then((result) => {
        console.log(result.data);
        setItems(result.data);
      })
      .catch((ex) => console.log(ex));
  }, []);

  return (
    <div className="listPage">
      <h3>Categories List</h3>
      <Link to="new" className="newButtonDiv">
        <button className="newButton">Add new category</button>
      </Link>
      <div className="list">
        <div className="itemListUp">ID</div>
        <div className="itemListUp">Name</div>
        <div className="itemListUp">Description</div>
        <div className="itemListUp">Actions</div>
      </div>
      <div>
        {items.map((item) => (
          <div className="list">
            <div className="itemList">{item.id}</div>
            <div className="itemList">{item.name}</div>
            <div className="itemList">{item.description}</div>
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

export default CategoryList;
