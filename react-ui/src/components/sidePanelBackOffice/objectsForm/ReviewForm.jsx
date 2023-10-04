import React, { useEffect } from "react";
import { useState } from "react";
import api from "../../../utils/api";
import { useNavigate, useParams } from "react-router-dom";
import "./Form.css";

const ReviewForm = () => {
  const { id } = useParams();
  //const [id, setId] = useState("");
  const [productID, setProductID] = useState("");
  const [userID, setUserID] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState("");
  const [ratingError, setRatingError] = useState(""); // Add rating error state
  const [apiError, setApiError] = useState(""); // Add API error state

  const navigate = useNavigate();

  useEffect(() => {
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
        .catch((ex) => {
          setApiError(ex.response ? ex.response.data : "An error occurred");
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

    if (!productID || !userID || !reviewText || !rating) {
      setApiError("Please fill out all required fields");
      return;
    }

    const newItem = {
      id: id || 0,
      productID,
      userID,
      reviewText,
      rating,
    };

    const verb = id ? "put" : "post";

    console.log(newItem);

    api[verb]("review", newItem)
      .then((res) => {
        console.log(res.data);
        navigate("../review");
      })
      .catch((ex) => {
        setApiError(ex.response ? ex.response.data : "An error occurred");
      });
  };

  return (
    <>
      <h2>Review Form</h2>
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
      {/* Display API error message */}
    </>
  );
};

export default ReviewForm;
