import React, { useEffect } from "react";
import { useState } from "react";
import api from "../../../utils/api";
import { useNavigate, useParams } from "react-router-dom";
import "./Form.css";

const ReviewForm = () => {
  const { id } = useParams();
  const [productID, setProductID] = useState("");
  const [userID, setUserID] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState("");
  const [ratingError, setRatingError] = useState("");
  const [apiError, setApiError] = useState("");

  const navigate = useNavigate();
  const userIDFromTheToken = localStorage.getItem("site-token-userID");

  useEffect(() => {
    if (!userIDFromTheToken) {
      navigate("/login");
    }
    if (id) {
      api
        .get(`review/${id}`)
        .then((res) => {
          const item = res.data;

          setProductID(item.productID);
          setUserID(item.userID);
          setReviewText(item.reviewText);
          setRating(item.rating);
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
    navigate("../review");
  };

  const validateRating = (value) => {
    const parsedValue = parseInt(value, 10);
    if (isNaN(parsedValue) || parsedValue < 1 || parsedValue > 10) {
      setRatingError("Rating must be a number between 1 and 10");
    } else {
      setRatingError("");
    }
  };

  const handelSubmit = (e) => {
    e.preventDefault();

    const newItem = {
      id: id || 0,
      productID,
      userID,
      reviewText,
      rating,
    };

    const verb = id ? "put" : "post";

    api[verb]("review", newItem)
      .then((res) => {
        navigate("../review");
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
      <h3>Review Form</h3>
      <div className="form" onSubmit={handelSubmit}>
        <div className="formItem">
          <div className="formLabel">Product ID</div>
          <input
            type="number"
            value={productID}
            onChange={(e) => setProductID(e.target.value)}
          />
        </div>
        <div className="formItem">
          <div className="formLabel">User ID</div>
          <input
            type="number"
            value={userID}
            onChange={(e) => setUserID(e.target.value)}
          />
        </div>
        <div className="formItem">
          <div className="formLabel">Review Text</div>
          <input
            type="text"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />
        </div>
        <div className="formItem">
          <div className="formLabel">Rating</div>
          <input
            type="number"
            min="1"
            max="10"
            value={rating}
            onChange={(e) => {
              setRating(e.target.value);
              validateRating(e.target.value);
            }}
          />
          {ratingError && <p className="error">{ratingError}</p>}
        </div>
        <div className="buttonsDiv">
          <button type="submit" onClick={handelSubmit}>
            Save
          </button>
          <button onClick={handelCancel}>Cancel</button>
        </div>
      </div>
      {apiError && <p className="error">{apiError}</p>}
    </>
  );
};

export default ReviewForm;
