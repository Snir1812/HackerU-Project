import React, { useEffect, useState } from "react";
import api from "../../../utils/api";
import { useNavigate, useParams } from "react-router-dom";
import "./Form.css";
import "../../../pages/General.css";

const UserForm = () => {
  const { id } = useParams();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [type, setType] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [apiError, setApiError] = useState("");
  const [formValid, setFormValid] = useState(false);

  const navigate = useNavigate();

  const admin = localStorage.getItem("site-token-type") === "Admin";

  useEffect(() => {
    if (id) {
      api
        .get(`user/${id}`)
        .then((res) => {
          const item = res.data;

          setFirstName(item.firstName);
          setLastName(item.lastName);
          setEmail(item.email);
          setType(item.type);
          setUserName(item.userName);
          setPassword(item.password);
          setAddress(item.address);
          setPhoneNumber(item.phoneNumber);
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
    const isValid =
      firstName !== "" &&
      lastName !== "" &&
      email !== "" &&
      userName !== "" &&
      password !== "" &&
      address !== "" &&
      phoneNumber !== "";

    setFormValid(isValid);
  }, [firstName, lastName, email, userName, password, address, phoneNumber]);

  const handelCancel = () => {
    navigate(-1);
  };

  const handelSubmit = (e) => {
    e.preventDefault();

    // Check if the form is valid
    if (!formValid) {
      setApiError("Please fill in all fields before submitting.");
      return;
    }

    const typeNumber = parseInt(type, 10);

    const newItem = {
      id: id || 0,
      firstName,
      lastName,
      type: isNaN(typeNumber) ? 0 : typeNumber,
      email,
      userName,
      password,
      address,
      phoneNumber,
    };

    const verb = id ? "put" : "post";
    const action = id ? "updated" : "created";

    api[verb]("User", newItem)
      .then((res) => {
        navigate(-1);
        alert(`User ${action} successfully`);
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

  const userTypeOptions = [
    { value: 0, label: "Unknown" },
    { value: 999, label: "Admin" },
  ];

  return (
    <div className="generalPage flex-column">
      <h3>User Form</h3>
      <form className="form" onSubmit={handelSubmit}>
        <div className="formItem">
          <div className="formLabel">First Name</div>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="formItem">
          <div className="formLabel">Last Name</div>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        {admin && (
          <div className="formItem">
            <div className="formLabel">Type</div>
            <select value={type} onChange={(e) => setType(e.target.value)}>
              {userTypeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className="formItem">
          <div className="formLabel">Email</div>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="formItem">
          <div className="formLabel">User Name</div>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="formItem">
          <div className="formLabel">Password</div>
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="formItem">
          <div className="formLabel">Address</div>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="formItem">
          <div className="formLabel">Phone Number</div>
          <input
            type="number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div className="buttonsDiv">
          <button type="submit" disabled={!formValid}>
            Save
          </button>
          <button type="button" onClick={handelCancel}>
            Cancel
          </button>
        </div>
      </form>
      {apiError && <p className="error">{apiError}</p>}{" "}
    </div>
  );
};

export default UserForm;
