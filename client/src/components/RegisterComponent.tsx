import React, { useEffect, useState } from "react";
import logo from "../assets/logo-grey.png";
import appleIcon from "../assets/socials/apple.d77d954d.svg";
import googleIcon from "../assets/socials/google.d19562c0.svg";
import facebookIcon from "../assets/socials/facebook-button.2cbe7756.svg";
import { Link, Navigate, useNavigate } from "react-router-dom";
import server from "../api/server";

const RegisterComponent = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<true | false>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    setErrorMessage("");
  }, [username, email, password]);

  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await server.post(
        "/users/register",
        { username, email, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setUsername("");
      setEmail("");
      setPassword("");
      navigate("/login");
    } catch (err: any) {
      setErrorMessage(err.response.data.message);
    }
  };

  return (
    <div className="all-content">
      <div className="base-container">
        <div className="login-component">
          <div className="login-header">
            <img src={logo}></img>Chessverse
          </div>
          <div className={`error-message ${errorMessage ? "active" : ""}`}>
            {errorMessage}
          </div>
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="input-container">
              <span className="icon">b</span>
              <input
                value={username}
                className="auth-input"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
              ></input>
            </div>
            <div className="input-container">
              <span className="icon">y</span>
              <input
                value={email}
                className="auth-input"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
            <div className="input-container">
              <span className="icon">d</span>
              <input
                value={password}
                className="auth-input"
                type={`${showPassword ? "text" : "password"}`}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              ></input>
              <span
                className="icon"
                onClick={() => {
                  showPassword ? setShowPassword(false) : setShowPassword(true);
                }}
              >
                W
              </span>
            </div>
            <button className="login-submit-button">Sign Up</button>
          </form>
          <div className="social-auth-component">
            <div className="social-auth-separator">
              <span className="line"></span>
              <span className="separator-paragraph">OR</span>
              <span className="line"></span>
            </div>
            <div className="social-auth-options">
              <div className="social-auth-button social-auth-apple">
                <img className="social-auth-button-icon" src={appleIcon}></img>
                Sign up with Apple
              </div>
              <div className="social-auth-button social-auth-google">
                <img className="social-auth-button-icon" src={googleIcon}></img>
                Sign up with Google
              </div>
              <div className="social-auth-button social-auth-facebook">
                <img
                  className="social-auth-button-icon"
                  src={facebookIcon}
                ></img>
                Sign up with Facebook
              </div>
            </div>
          </div>
        </div>
        <div className="login-signup">
          Already have an account?{" "}
          <Link
            className="auth-link"
            to={"/login"}
            style={{ textDecoration: "none" }}
          >
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterComponent;
