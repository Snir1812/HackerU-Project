import React from "react";
import "./Login.css";
import { useState } from "react";
import api from "../../utils/api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [apiError, setApiError] = useState(""); // Add API error state
  const nav = useNavigate();

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
          const token = result.data;
          const tokenParts = token.split(".");
          const payload = JSON.parse(atob(tokenParts[1]));
          const tokenType = payload.type;

          localStorage.setItem("site-token", token);
          localStorage.setItem("site-token-type", tokenType);

          setApiError("Logged in - success");
          nav("/");
        } else {
          localStorage.setItem("site-token", "");
          setApiError(`could not login ${result.status}`);
        }
      })
      .catch((ex) => {
        localStorage.setItem("site-token", "");
        setApiError(ex.response ? ex.response.data : "An error occurred");
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>Username :</label>
        <input
          required
          type="text"
          placeholder="enter your username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <label>Password :</label>
        <input
          required
          type="password"
          placeholder="enter your password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        {apiError && <p className="error">{apiError}</p>}
        {/* Display API error message */}
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default Login;
