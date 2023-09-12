import React from "react";
import "./Login.css";
import { useState } from "react";
import api from "../../utils/api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const nav = useNavigate();

  console.log(error);

  const handleSubmit = (e) => {
    e.preventDefault();

    const loginData = {
      username,
      password,
    };

    api
      .post("Login", loginData)
      .then((result) => {
        if (result.status === 200) {
          localStorage.setItem("site-token", result.data);
          console.log("Logged in - success");
          nav("/backoffice");
        } else {
          localStorage.setItem("site-token", "");
          setError(`could not login ${result.status}`);
        }
      })
      .catch((ex) => {
        localStorage.setItem("site-token", "");
        setError(ex);
        //console.error(ex);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>Username :</label>
        <input
          type="text"
          placeholder="enter your username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <label>Password :</label>
        <input
          type="password"
          placeholder="enter your password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit">Login</button>
      </form>
      {error !== "" ?? <h3>Error during login</h3>}
    </>
  );
};

export default Login;
