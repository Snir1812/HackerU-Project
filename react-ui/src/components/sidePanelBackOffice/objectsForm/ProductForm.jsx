import React, { useEffect } from "react";
import { useState } from "react";
import api from "../../../utils/api";
import { useNavigate, useParams } from "react-router-dom";

const ProductForm = () => {
  const { id } = useParams();
  //const [id, setId] = useState("");
  const [productName, setProductName] = useState("");
  const [categoryID, setCategoryID] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [apiError, setApiError] = useState(""); // Add API error state

  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      api
        .get(`product/${id}`)
        .then((res) => {
          const item = res.data;

          setProductName(item.productName);
          setCategoryID(item.categoryID);
          setDescription(item.description);
          setPrice(item.price);
          setStockQuantity(item.stockQuantity);
          setImageUrl(item.imageUrl);
        })
        .catch((ex) => {
          setApiError(ex.response ? ex.response.data : "An error occurred");
        });
    }
  }, [id]);

  const handelCancel = () => {
    navigate("../product");
  };

  const handelSubmit = (e) => {
    e.preventDefault();

    const newItem = {
      id: id || 0,
      productName,
      description,
      price,
      stockQuantity,
      categoryID,
      imageUrl,
    };

    const verb = id ? "put" : "post";

    console.log(newItem);

    api[verb]("Product", newItem)
      .then((res) => {
        console.log(res.data);
        navigate("../product");
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
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>
      </div>{" "}
      {apiError && <p className="error">{apiError}</p>}{" "}
      {/* Display API error message */}
      <button type="submit" onClick={handelSubmit}>
        Save
      </button>
      <button onClick={handelCancel}>Cancel</button>
    </>
  );
};

export default ProductForm;
