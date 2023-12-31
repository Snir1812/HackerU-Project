import React, { useEffect, useState } from "react";
import api from "../../../utils/api";
import "./List.css";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [items, setItems] = useState([]);

  const handelDelete = (id) => {
    if (!window.confirm("Are you sure ?")) {
      return;
    }
    api
      .delete(`Product/${id}`)
      .then(() => {
        setItems(items.filter((i) => i.product.id !== id));
      })
      .catch((ex) => console.log(ex));
  };

  useEffect(() => {
    api
      .get("Product")
      .then((result) => {
        setItems(result.data);
      })
      .catch((ex) => console.log(ex));
  }, []);

  return (
    <div className="listPage">
      <h3>Products List</h3>
      <Link to="new" className="newButtonDiv">
        <button className="newButton">Add new product</button>
      </Link>
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
          <div className="list" key={item.product.id}>
            <div className="itemList">{item.product.id}</div>
            <div className="itemList">{item.product.productName}</div>
            <div className="itemList">{item.product.categoryID}</div>
            <div className="itemList">{item.product.description}</div>
            <div className="itemList">{item.product.price}</div>
            <div className="itemList">{item.product.stockQuantity}</div>
            <img
              src={`data:image/jpeg;base64,${item.imageBase64}`}
              alt={item.productName}
              className="productImage"
            />
            <div className="itemListButtons">
              <Link to={`edit/${item.product.id}`} className="noUnderline">
                <button className="button edit">Edit</button>
              </Link>
              <button
                className="button delete"
                onClick={() => handelDelete(item.product.id)}
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

export default ProductList;
