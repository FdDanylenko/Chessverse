import React, { useState } from "react";
import logo from "../assets/logo-grey.png";
import appleIcon from "../assets/socials/apple.d77d954d.svg";
import googleIcon from "../assets/socials/google.d19562c0.svg";
import facebookIcon from "../assets/socials/facebook-button.2cbe7756.svg";
import { Link } from "react-router-dom";

// TODO I need to make ForgotPasswordComponent and navigate to him here

const ForgotPasswordComponent = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");
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
          <form className="login-form">
            <div className="input-container">
              <span className="icon">b</span>
              <input
                className="auth-input"
                placeholder="Username or Email"
              ></input>
            </div>
            <button className="login-submit-button">Reset Password</button>
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
                Log in with Apple
              </div>
              <div className="social-auth-button social-auth-google">
                <img className="social-auth-button-icon" src={googleIcon}></img>
                Log in with Google
              </div>
              <div className="social-auth-button social-auth-facebook">
                <img
                  className="social-auth-button-icon"
                  src={facebookIcon}
                ></img>
                Log in with Facebook
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordComponent;
