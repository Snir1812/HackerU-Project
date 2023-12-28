import React, { useEffect, useState } from "react";
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
  const [formValid, setFormValid] = useState(false);

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
              setApiError(error.response.data);
            }
          } else {
            setApiError("An error occurred");
          }
        });
    }
  }, [id]);

  useEffect(() => {
    // Check if all required fields are filled and rating is valid
    const isValid =
      productID !== "" &&
      userID !== "" &&
      reviewText !== "" &&
      rating !== "" &&
      ratingError === "";

    setFormValid(isValid);
  }, [productID, userID, reviewText, rating, ratingError]);

  const handelCancel = () => {
    navigate("../review");
  };

  const handelSubmit = (e) => {
    e.preventDefault();

    // Check if the form is valid
    if (!formValid) {
      setApiError("Please fill in all fields correctly before submitting.");
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
    const action = id ? "updated" : "created";

    api[verb]("review", newItem)
      .then((res) => {
        navigate("../review");
        alert(`Review ${action} successfully`);
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
      <h3>Review Form</h3>
      <form className="form" onSubmit={handelSubmit}>
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
            }}
          />
          {ratingError && <p className="error">{ratingError}</p>}
        </div>
        <div className="buttonsDiv">
          <button type="submit" disabled={!formValid}>
            Save
          </button>
          <button onClick={handelCancel}>Cancel</button>
        </div>
      </form>
      {apiError && <p className="error">{apiError}</p>}
    </>
  );
};

export default ReviewForm;
