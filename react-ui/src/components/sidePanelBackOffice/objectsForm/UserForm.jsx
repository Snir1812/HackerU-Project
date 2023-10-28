import React, { useEffect } from "react";
import { useState } from "react";
import api from "../../../utils/api";
import { useNavigate, useParams } from "react-router-dom";
import "./Form.css";
import "../../../pages/General.css";

const UserForm = () => {
  const { id } = useParams();
  //const [id, setId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [type, setType] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [apiError, setApiError] = useState(""); // Add API error state

  const navigate = useNavigate();

  const Admin = localStorage.getItem("site-token-type") === "Admin";

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
        .catch((ex) => {
          setApiError(ex.response ? ex.response.data : "An error occurred");
        });
    }
  }, [id]);

  const handelCancel = () => {
    navigate(-1);
  };

  const handelSubmit = (e) => {
    e.preventDefault();

    if (
      !firstName ||
      !lastName ||
      !email ||
      !userName ||
      !password ||
      !address ||
      !phoneNumber
    ) {
      setApiError("Please fill out all required fields");
      return;
    }

    // Convert type to a number
    const typeNumber = parseInt(type, 10);

    const newItem = {
      id: id || 0,
      firstName,
      lastName,
      type: isNaN(typeNumber) ? 0 : typeNumber, // Use 0 as the default if the conversion fails
      email,
      userName,
      password,
      address,
      phoneNumber,
    };

    const verb = id ? "put" : "post";

    console.log(newItem);

    api[verb]("User", newItem)
      .then((res) => {
        console.log(res.data);
        navigate(-1);
      })
      .catch((ex) => {
        setApiError(ex.response ? ex.response.data : "An error occurred");
      });
  };

  const userTypeOptions = [
    { value: 0, label: "Unknown" },
    { value: 999, label: "Admin" },
  ];

  return (
    <div className="generalPage flex-column">
      <h2>User Form</h2>
      <div className="form" onSubmit={handelSubmit}>
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
        {Admin && (
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
          <button type="submit" onClick={handelSubmit}>
            Save
          </button>
          <button onClick={handelCancel}>Cancel</button>
        </div>
      </div>
      {apiError && <p className="error">{apiError}</p>}{" "}
      {/* Display API error message */}
    </div>
  );
};

export default UserForm;
