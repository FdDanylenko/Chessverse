import React, { useEffect, useState } from "react";
import logo from "../assets/logo-grey.png";
import appleIcon from "../assets/socials/apple.d77d954d.svg";
import googleIcon from "../assets/socials/google.d19562c0.svg";
import facebookIcon from "../assets/socials/facebook-button.2cbe7756.svg";
import { Link, useNavigate } from "react-router-dom";
import server from "../api/server";
import useAuth from "../hooks/useAuth";
import useServerPrivate from "../hooks/useServerPrivate";

// TODO I need to make ForgotPasswordComponent and navigate to him here

const LoginComponent = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<true | false>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { setUser, username, setUsername, setAccessToken } = useAuth();
  const navigate = useNavigate();
  const serverPrivate = useServerPrivate();

  useEffect(() => {
    setErrorMessage("");
  }, [usernameOrEmail, password]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await server.post(
        "/users/login",
        { authQuery: usernameOrEmail, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setAccessToken(response.data.accessToken);
      setUsername(response.data.username);
      try {
        const result = await serverPrivate.post(
          "/users/getUserData",
          {
            username: response.data.username,
          },
          { headers: { Authorization: `Bearer ${response.data.accessToken}` } }
        );
        setUser(result.data.user);
      } catch (error: any) {
        console.log(error.message);
      }
      setUsernameOrEmail("");
      setPassword("");
      navigate("/home");
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
                value={usernameOrEmail}
                className="auth-input"
                placeholder="Username or Email"
                onChange={(e) => setUsernameOrEmail(e.target.value)}
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
            <div className="auth-login-options">
              <div className="remember-me-component">
                <input id="remember-me-checkbox" type="checkbox"></input>
                <label htmlFor="remember-me-checkbox">Remember me</label>
              </div>
              <div className="forgot-password">
                {" "}
                <Link
                  className="auth-link"
                  to={"/forgot"}
                  style={{ textDecoration: "none" }}
                >
                  Forgot password?
                </Link>
              </div>
            </div>
            <button className="login-submit-button">Log In</button>
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
        <div className="login-signup">
          New?{" "}
          <Link
            className="auth-link"
            to={"/register"}
            style={{ textDecoration: "none" }}
          >
            Sign up - and start playing chess!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
