import React, { useEffect } from "react";
import { useState } from "react";
import api from "../../../utils/api";
import { useNavigate, useParams } from "react-router-dom";

const UserForm = () => {
  const { id } = useParams();
  //const [id, setId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      api
        .get(`user/${id}`)
        .then((res) => {
          const item = res.data;

          setFirstName(item.firstName);
          setLastName(item.lastName);
          setEmail(item.email);
          setUserName(item.userName);
          setPassword(item.password);
          setAddress(item.address);
          setPhoneNumber(item.phoneNumber);
        })
        .catch((ex) => console.log(ex));
    }
  }, [id]);

  const handelCancel = () => {
    navigate("../user");
  };

  const handelSubmit = (e) => {
    e.preventDefault();

    const newItem = {
      id: id || 0,
      firstName,
      lastName,
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
        navigate("../user");
      })
      .catch((ex) => console.log(ex));
  };

  return (
    <>
      <h2>Product Form</h2>
      <div className="form" onSubmit={handelSubmit}>
        <div className="formItem">
          <div className="formLabel">First Name</div>
          <input
            type="text"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="formItem">
          <div className="formLabel">Last Name</div>
          <input
            type="text"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="formItem">
          <div className="formLabel">Email</div>
          <input
            type="text"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="formItem">
          <div className="formLabel">User Name</div>
          <input
            type="text"
            required
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="formItem">
          <div className="formLabel">Password</div>
          <input
            type="text"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="formItem">
          <div className="formLabel">Address</div>
          <input
            type="text"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="formItem">
          <div className="formLabel">Phone Number</div>
          <input
            type="number"
            required
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
      </div>
      <button type="submit" onClick={handelSubmit}>
        Save
      </button>
      <button onClick={handelCancel}>Cancel</button>
    </>
  );
};

export default UserForm;
