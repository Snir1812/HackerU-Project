import { useParams, useNavigate } from "react-router-dom";
import { useProductData } from "../../context/ProductDataContext";
import "./ProductDetails.css";
import React, { useState } from "react";

const ProductDetails = () => {
  const { productID } = useParams();
  const [quantity, setQuantity] = useState(1);
  const productData = useProductData();
  const navigate = useNavigate();

  if (!productData) {
    return <p>Loading...</p>;
  }

  const item = productData.find((item) => item.product.id == productID);

  const addToCart = (item, quantity) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingProduct = cart.find(
      (cartItem) => cartItem.productID === item.product.id
    );

    if (existingProduct) {
      existingProduct.quantity = (existingProduct.quantity || 1) + quantity;
    } else {
      cart.push({
        productID: item.product.id,
        productName: item.product.productName,
        pricePerItem: item.product.price,
        quantity: quantity,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Item added to the cart successfully!");
  };

  const formatReviewDate = (dateStr) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };

    const formattedDate = new Date(dateStr).toLocaleDateString(
      "en-US",
      options
    );

    return formattedDate;
  };

  return (
    <div className="detailsPage">
      {item ? (
        <div className="detailsDiv">
          <img
            src={`data:image/jpeg;base64,${item.imageBase64}`}
            alt={item.product.productName}
            className="detailsImage"
          />
          <div className="detailsItem">{item.product.productName}</div>
          <div className="detailsItem">
            <span className="propDescription">Stock quantity:</span>{" "}
            {item.product.stockQuantity}
          </div>
          <div className="detailsItem">
            <span className="propDescription">Price:</span> {item.product.price}
            $
          </div>
          <div className="detailsItem">
            <span className="propDescription">Description:</span>{" "}
            {item.product.description}
          </div>
          <div className="detailsButtonsDiv">
            <button
              className="detailsButton"
              onClick={() => {
                navigate(-1);
              }}
            >
              Back
            </button>
            <button
              className="detailsButton"
              onClick={() => addToCart(item, quantity)}
            >
              Add To Cart
            </button>
            <div className="quantityControls">
              <button
                className="quantityButton"
                onClick={() => setQuantity(Math.max(quantity - 1, 1))}
              >
                -
              </button>
              <span className="quantity">{quantity}</span>
              <button
                className="quantityButton"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
          </div>{" "}
          <div>
            {item.product.reviews ? (
              <div className="detailsItem">
                <div className="propDescription">Reviews:</div>
                {item.product.reviews.map((review, index) => (
                  <div className="reviewDiv" key={index}>
                    <span>{review.reviewText}</span>
                    <span>Rating : {review.rating}</span>
                    <span>Date : {formatReviewDate(review.reviewDate)}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p>No reviews available</p>
            )}
          </div>
        </div>
      ) : (
        <p>Product not found</p>
      )}
    </div>
  );
};

export default ProductDetails;
