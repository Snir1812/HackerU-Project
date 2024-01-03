import React, { useEffect, useState } from "react";
import api from "../../../utils/api";
import { useNavigate, useParams } from "react-router-dom";
import "./Form.css";

const CategoryForm = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [apiError, setApiError] = useState("");
  const [formValid, setFormValid] = useState(false);

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
              setApiError(error.response.data);
            }
          } else {
            setApiError("An error occurred");
          }
        });
    }
  }, [id]);

  useEffect(() => {
    // Check if all required fields are filled
    const isValid = name !== "" && description !== "";

    setFormValid(isValid);
  }, [name, description]);

  const handelCancel = () => {
    navigate("../category");
  };

  const handelSubmit = (e) => {
    e.preventDefault();

    // Check if the form is valid
    if (!formValid) {
      setApiError("Please fill in all fields before submitting.");
      return;
    }

    const newItem = {
      id: id || 0,
      name,
      description,
    };

    const verb = id ? "put" : "post";
    const action = id ? "updated" : "created";

    api[verb]("category", newItem)
      .then((res) => {
        navigate("../category");
        alert(`Category ${action} successfully`);
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
      <h3>Category Form</h3>
      <form className="form" onSubmit={handelSubmit}>
        <div className="formItem">
          <div>Name</div>
          <input
            className="formInput"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
        </div>{" "}
        <div className="buttonsDiv">
          <button type="submit" className="formButton" disabled={!formValid}>
            Save
          </button>
          <button type="button" className="formButton" onClick={handelCancel}>
            Cancel
          </button>
        </div>
      </form>
      {apiError && <p className="error">{apiError}</p>}{" "}
    </>
  );
};

export default CategoryForm;
