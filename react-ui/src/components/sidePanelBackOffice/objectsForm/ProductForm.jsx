import React, { useEffect } from "react";
import { useState } from "react";
import api from "../../../utils/api";
import { useNavigate, useParams } from "react-router-dom";
import "./Form.css";

const ProductForm = () => {
  const { id } = useParams();
  //const [id, setId] = useState("");
  const [productName, setProductName] = useState("");
  const [categoryID, setCategoryID] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [apiError, setApiError] = useState(""); // Add API error state

  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      api
        .get(`product/${id}`)
        .then((res) => {
          const item = res.data;

          setProductName(item.product.productName);
          setCategoryID(item.product.categoryID);
          setDescription(item.product.description);
          setPrice(item.product.price);
          setStockQuantity(item.product.stockQuantity);
          setImageFile(item.imageBase64);
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
              setApiError("An error occurred");
            }
          } else {
            setApiError("An error occurred");
          }
        });
    }
  }, [id]);

  const handelCancel = () => {
    navigate("../product");
  };

  const handelSubmit = (e) => {
    e.preventDefault();

    // if (
    //   !productName ||
    //   !categoryID ||
    //   !description ||
    //   !price ||
    //   !stockQuantity ||
    //   !imageFile
    // ) {
    //   setApiError("Please fill out all required fields");
    //   return;
    // }

    const formData = new FormData();

    formData.append("id", id || 0);
    formData.append("productName", productName);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("stockQuantity", stockQuantity);
    formData.append("categoryID", categoryID);
    formData.append("imageFile", imageFile);

    const verb = id ? "put" : "post";

    api[verb]("Product", formData)
      .then((res) => {
        console.log(res.data);
        navigate("../product");
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
            setApiError("An error occurred");
          }
        } else {
          setApiError("An error occurred");
        }
      });
  };

  return (
    <>
      <h3>Product Form</h3>
      <div className="form" onSubmit={handelSubmit}>
        <div className="formItem">
          <div className="formLabel">Product Name</div>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>
        <div className="formItem">
          <div className="formLabel">Category ID</div>
          <input
            type="number"
            value={categoryID}
            onChange={(e) => setCategoryID(e.target.value)}
          />
        </div>
        <div className="formItem">
          <div className="formLabel">Description</div>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="formItem">
          <div className="formLabel">Price</div>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="formItem">
          <div className="formLabel">Stock Quantity</div>
          <input
            type="number"
            value={stockQuantity}
            onChange={(e) => setStockQuantity(e.target.value)}
          />
        </div>
        <div className="formItem">
          <div className="formLabel">Image</div>
          {/* {!imageFile && ( */}
          <input
            type="file"
            accept=".jpg, .jpeg, .png, .gif"
            onChange={(e) => {
              setImageFile(e.target.files[0]);
            }}
          />
          {/* )} */}
          {imageFile && (
            <img
              src={`data:image/jpeg;base64,${imageFile}`} // Adjust the format accordingly
              alt={productName}
              className="productImage"
            />
          )}
        </div>
        <div className="buttonsDiv">
          <button type="submit" onClick={handelSubmit}>
            Save
          </button>
          <button onClick={handelCancel}>Cancel</button>
        </div>
      </div>
      {apiError && <p className="error">{apiError}</p>}
      {/* Display API error message */}
    </>
  );
};

export default ProductForm;
