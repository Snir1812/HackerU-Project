import React, { useEffect } from "react";
import { useState } from "react";
import api from "../../../utils/api";
import { useNavigate, useParams } from "react-router-dom";
import "./Form.css";

const CategoryForm = () => {
  const { id } = useParams();
  //const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [apiError, setApiError] = useState(""); // Add API error state

  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      api
        .get(`category/${id}`)
        .then((res) => {
          const item = res.data;

          setName(item.name);
          setDescription(item.description);
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
    navigate("../category");
  };

  const handelSubmit = (e) => {
    e.preventDefault();

    // if (!name || !description) {
    //   setApiError("Please fill out all required fields");
    //   return;
    // }

    const newItem = {
      id: id || 0,
      name,
      description,
    };

    const verb = id ? "put" : "post";

    console.log(newItem);

    api[verb]("category", newItem)
      .then((res) => {
        console.log(res.data);
        navigate("../category");
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
      <h3>Category Form</h3>
      <div className="form" onSubmit={handelSubmit}>
        <div className="formItem">
          <div className="formLabel">Name</div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="formItem">
          <div className="formLabel">Description</div>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>{" "}
        <div className="buttonsDiv">
          <button type="submit" onClick={handelSubmit}>
            Save
          </button>
          <button onClick={handelCancel}>Cancel</button>
        </div>
      </div>
      {apiError && <p className="error">{apiError}</p>}{" "}
      {/* Display API error message */}
    </>
  );
};

export default CategoryForm;
