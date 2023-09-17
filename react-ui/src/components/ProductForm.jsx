import React from "react";
import { useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

const ProductForm = () => {
  const [id, setId] = useState("");
  const [productName, setProductName] = useState("");
  const [categoryID, setCategoryID] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");
  const [imageUrl, setImageURL] = useState("");

  const navigate = useNavigate();

  const handelSubmit = (e) => {
    e.preventDefault();

    const newItem = {
      id: 0,
      productName,
      description,
      price,
      stockQuantity,
      categoryID,
      imageUrl,
    };

    console.log(newItem);

    api
      .post("product", newItem)
      .then((res) => {
        console.log(res.data);
        navigate("../product");
      })
      .catch((ex) => console.log(ex));
  };

  return (
    <>
      <h2>Product Form</h2>
      <div className="form" onSubmit={handelSubmit}>
        <div className="formItem">
          <div className="formLabel">Product Name</div>
          <input
            type="text"
            required
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>
        <div className="formItem">
          <div className="formLabel">Category ID</div>
          <input
            type="number"
            required
            value={categoryID}
            onChange={(e) => setCategoryID(e.target.value)}
          />
        </div>
        <div className="formItem">
          <div className="formLabel">Description</div>
          <input
            type="text"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="formItem">
          <div className="formLabel">Price</div>
          <input
            type="number"
            required
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="formItem">
          <div className="formLabel">Stock Quantity</div>
          <input
            type="number"
            required
            value={stockQuantity}
            onChange={(e) => setStockQuantity(e.target.value)}
          />
        </div>
        <div className="formItem">
          <div className="formLabel">Image URL</div>
          <input
            type="text"
            required
            value={imageUrl}
            onChange={(e) => setImageURL(e.target.value)}
          />
        </div>
      </div>
      <button type="submit" onClick={handelSubmit}>
        Save
      </button>
      <button>Cancel</button>
    </>
  );
};

export default ProductForm;
