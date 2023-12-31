import React from "react";
import "./Login.css";
import { useEffect, useState } from "react";
import api from "../../utils/api";
import { useNavigate } from "react-router-dom";
import "../../pages/General.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [apiError, setApiError] = useState("");
  const [formValid, setFormValid] = useState(false);
  const nav = useNavigate();

  const saveTokenToLocalStorage = (token) => {
    const expirationTime = new Date().getTime() + 24 * 60 * 60 * 1000;

    const tokenParts = token.split(".");
    const payload = JSON.parse(atob(tokenParts[1]));
    const tokenType = payload.type;
    const tokenUserID = payload.sub;

    localStorage.setItem("site-token", token);
    localStorage.setItem("site-token-type", tokenType);
    localStorage.setItem("site-token-userID", tokenUserID);
    localStorage.setItem("site-token-expiration", expirationTime);
  };

  useEffect(() => {
    // Check if all required fields are filled
    const isValid = username !== "" && password !== "";

    setFormValid(isValid);
  }, [username, password]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the form is valid
    if (!formValid) {
      setApiError("Please fill in all fields before submitting.");
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

          alert("Welcome back");

          setApiError("Logged in - success");

          window.location.reload();
          window.location.href = "/";
        } else {
          // localStorage.setItem("site-token", "");
          setApiError(`could not login ${result.status}`);
        }
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

  const handleSignup = () => {
    nav("/signup");
  };

  return (
    <div className="generalPage">
      <form onSubmit={handleSubmit} className="loginForm">
        <div className="fs-3">Log In</div>
        <div className="formItem">
          <label>Username :</label>
          <input
            className="formInput"
            type="text"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="formItem">
          <label>Password :</label>
          <input
            className="formInput"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="buttonsDiv">
          <button type="submit" className="loginButton" disabled={!formValid}>
            Login
          </button>
          <button type="button" className="loginButton" onClick={handleSignup}>
            Signup
          </button>
        </div>
        {apiError && <p className="error">{apiError}</p>}
      </form>
    </div>
  );
};

export default Login;
