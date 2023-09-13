import React, { useEffect, useState } from "react";
import api from "../../../utils/api";
import "./List.css";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api
      .get("Product")
      .then((result) => {
        console.log(result.data);
        setItems(result.data);
      })
      .catch((ex) => console.log(ex));
  }, []);

  return (
    <div className="listPage">
      <h3>Products List</h3>
      <button as={Link} to="new">
        Add new product
      </button>
      <div className="list">
        <div className="itemListUp">ID</div>
        <div className="itemListUp">Product Name</div>
        <div className="itemListUp">Category ID</div>
        <div className="itemListUp">Description</div>
        <div className="itemListUp">Price</div>
        <div className="itemListUp">Stock Quantity</div>
        <div className="itemListUp">Image URL</div>
        <div className="itemListUp">Actions</div>
      </div>
      <div>
        {items.map((item) => (
          <div className="list">
            <div className="itemList">{item.id}</div>
            <div className="itemList">{item.productName}</div>
            <div className="itemList">{item.categoryID}</div>
            <div className="itemList">{item.description}</div>
            <div className="itemList">{item.price}</div>
            <div className="itemList">{item.stockQuantity}</div>
            <div className="itemList">{item.imageUrl}</div>
            <div className="itemList">
              <button className="button">Edit</button>
              <button className="button">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
