import { Link, useNavigate } from "react-router-dom";
import profilePicture from "../assets/207655783.8a89919c.50x50o.1f98a068a61d.jpg";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";
import server from "../api/server";
import useRefreshToken from "../hooks/useRefreshToken";
import useServerPrivate from "../hooks/useServerPrivate";

const HomeComponent = () => {
  const { username, user, setUser, accessToken, setAccessToken } = useAuth();

  return (
    <div className="home-all-content">
      <div className="home-container">
        <header className="home-header">
          <Link to={"/user"} className="home-user-info-container">
            <img className="home-profile-picture" src={profilePicture}></img>
            <div>
              <span className="home-username">{user?.username}</span>
              <span
                className="country-flag"
                style={{
                  backgroundPositionX: "-180px",
                  backgroundPositionY: "-304px",
                }}
              ></span>
            </div>
          </Link>
          <div className="home-navigation-container">
            <Link
              to={""}
              className="home-navigation-option-container friends"
            ></Link>
            <Link
              to={""}
              className="home-navigation-option-container play"
            ></Link>
            <Link
              to={""}
              className="home-navigation-option-container messages"
            ></Link>
            <Link
              to={""}
              className="home-navigation-option-container settings"
            ></Link>
          </div>
        </header>
        <main className="home-main"></main>
        <footer className="footer"></footer>
      </div>
    </div>
  );
};

export default HomeComponent;
