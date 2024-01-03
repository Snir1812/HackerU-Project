import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../../utils/api";
import "./Form.css";

const ProductForm = () => {
  const { id } = useParams();
  const [productName, setProductName] = useState("");
  const [categoryID, setCategoryID] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [apiError, setApiError] = useState("");
  const [formValid, setFormValid] = useState(false);
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
              setApiError(error.response.data);
            }
          } else {
            setApiError("An error occurred");
          }
        });
    }
  }, [id]);

  useEffect(() => {
    const isUpdateFormValid =
      id && productName && categoryID && description && price && stockQuantity;
    const isCreateFormValid =
      !id &&
      productName &&
      categoryID &&
      description &&
      price &&
      stockQuantity &&
      imageFile;

    setFormValid(isUpdateFormValid || isCreateFormValid);
  }, [
    id,
    productName,
    categoryID,
    description,
    price,
    stockQuantity,
    imageFile,
  ]);

  const handelCancel = () => {
    navigate("../product");
  };

  const handelSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("id", id || 0);
    formData.append("productName", productName);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("stockQuantity", stockQuantity);
    formData.append("categoryID", categoryID);
    formData.append("imageFile", imageFile);

    const verb = id ? "put" : "post";
    const action = id ? "updated" : "created";

    api[verb]("Product", formData)
      .then((res) => {
        navigate("../product");
        alert(`Product ${action} successfully`);
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
  };

  return (
    <>
      <h3>Product Form</h3>
      <form className="form" onSubmit={handelSubmit}>
        <div className="formItem">
          <div>Product Name</div>
          <input
            className="formInput"
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>
        <div className="formItem">
          <div>Category ID</div>
          <input
            className="formInput"
            type="number"
            value={categoryID}
            onChange={(e) => setCategoryID(e.target.value)}
          />
        </div>
        <div className="formItem">
          <div>Description</div>
          <input
            className="formInput"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="formItem">
          <div>Price</div>
          <input
            className="formInput"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="formItem">
          <div>Stock Quantity</div>
          <input
            className="formInput"
            type="number"
            value={stockQuantity}
            onChange={(e) => setStockQuantity(e.target.value)}
          />
        </div>
        <div className="formItem">
          <div>Image</div>
          <input
            type="file"
            accept=".jpg, .jpeg, .png, .gif"
            onChange={(e) => {
              setImageFile(e.target.files[0]);
            }}
          />
          {imageFile && (
            <img
              src={`data:image/jpeg;base64,${imageFile}`}
              alt={productName}
              className="productImage"
            />
          )}
        </div>
        <div className="buttonsDiv">
          <button
            type="submit"
            className="formButton"
            onClick={handelSubmit}
            disabled={!formValid}
          >
            Save
          </button>
          <button type="button" className="formButton" onClick={handelCancel}>
            Cancel
          </button>
        </div>
      </form>
      {apiError && <p className="error">{apiError}</p>}
    </>
  );
};

export default ProductForm;
