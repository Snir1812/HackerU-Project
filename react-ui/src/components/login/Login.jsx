import React from "react";
import "./Login.css";
import { useState } from "react";
import api from "../../utils/api";
import { useNavigate } from "react-router-dom";
import "../../pages/General.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [apiError, setApiError] = useState(""); // Add API error state
  const nav = useNavigate();

  const saveTokenToLocalStorage = (token) => {
    const expirationTime = new Date().getTime() + 24 * 60 * 60 * 1000; // 24 hours from now

    const tokenParts = token.split(".");
    const payload = JSON.parse(atob(tokenParts[1]));
    const tokenType = payload.type;

    localStorage.setItem("site-token", token);
    localStorage.setItem("site-token-type", tokenType);
    localStorage.setItem("site-token-expiration", expirationTime);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !password) {
      setApiError("Please fill out all required fields");
      return;
    }

    const loginData = {
      username,
      password,
    };

    api
      .post("Login", loginData)
      .then((result) => {
        if (result.status === 200) {
          saveTokenToLocalStorage(result.data);

          setApiError("Logged in - success");

          window.location.reload();
          window.location.href = "/";
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

  const handleSignup = () => {
    nav("/signup");
  };

  return (
    <div className="generalPage">
      <form onSubmit={handleSubmit} className="loginForm">
        <div className="formItem">
          <label>Username :</label>
          <input type="text" onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="formItem">
          <label>Password :</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="buttonsDiv">
          <button type="submit">Login</button>
          <button type="button" onClick={handleSignup}>
            Signup
          </button>
        </div>
        {apiError && <p className="error">{apiError}</p>}
        {/* Display API error message */}
      </form>
    </div>
  );
};

export default Login;
