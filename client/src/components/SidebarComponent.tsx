import { useContext, useState } from "react";
import useSettings from "../hooks/useSettings";
import logo from "../assets/logo-grey.png";
import { Theme, SidebarCollapsed } from "../models/settings";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useServerPrivate from "../hooks/useServerPrivate";
import { GameDataContext } from "./gameComponent/contexts/gameContext";
import { GameModes } from "./gameComponent/models/GameModes";

const SidebarComponent = () => {
  const { themeUI, setThemeUI } = useSettings();
  const { sidebarCollapsed, setSidebarCollapsed } = useSettings();
  const { setUser, setAccessToken } = useAuth();
  const { setGameMode, setGameStatus } = useContext(GameDataContext);
  const navigate = useNavigate();
  const serverPrivate = useServerPrivate();

  const handleLogout = async () => {
    try {
      const result = await serverPrivate.post("/users/logout", {
        withCredentials: true,
      });
      setUser(null);
      setAccessToken("");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`sidebar ${
        sidebarCollapsed === SidebarCollapsed.False ? "" : "collapsed"
      }`}
    >
      <div className="navigation-container">
        <Link
          to={"/"}
          style={{
            display: "flex",
            alignItems: "center",
            color: "#ffffff",
            textDecoration: "none",
          }}
        >
          <img className="navigation-header" src={logo}></img>
          <span
            className={`header ${
              sidebarCollapsed === SidebarCollapsed.False ? "" : "collapsed"
            }`}
          >
            Chessverse
          </span>
        </Link>

        <a
          className="navigation-option-container"
          onClick={() => {
            setGameMode(GameModes.PRESELECTED);
            setGameStatus("lobby");
            navigate("/play");
          }}
        >
          <span className="navigation-option-icon play"></span>
          <span
            className={`navigation-option-body ${
              sidebarCollapsed === SidebarCollapsed.False ? "" : "collapsed"
            }`}
          >
            Play
          </span>
        </a>
        <Link to={"puzzles"} className="navigation-option-container">
          <span className="navigation-option-icon puzzles"></span>
          <span
            className={`navigation-option-body ${
              sidebarCollapsed === SidebarCollapsed.False ? "" : "collapsed"
            }`}
          >
            Puzzles
          </span>
        </Link>
        <Link to={"learn"} className="navigation-option-container">
          <span className="navigation-option-icon learn"></span>
          <span
            className={`navigation-option-body ${
              sidebarCollapsed === SidebarCollapsed.False ? "" : "collapsed"
            }`}
          >
            Learn
          </span>
        </Link>
        <Link to={"more"} className="navigation-option-container">
          <span className="navigation-option-icon more"></span>
          <span
            className={`navigation-option-body ${
              sidebarCollapsed === SidebarCollapsed.False ? "" : "collapsed"
            }`}
          >
            More
          </span>
        </Link>
      </div>
      <div className="settings-container">
        <div
          className="sidebar-settings-option-container"
          onClick={() =>
            setThemeUI(themeUI === Theme.Dark ? Theme.Light : Theme.Dark)
          }
        >
          <span className="sidebar-settings-option-icon theme"></span>
          <span
            className={`${
              sidebarCollapsed === SidebarCollapsed.False
                ? "sidebar-settings-option-body"
                : "sidebar-settings-option-body-collapsed"
            }`}
          >{`${themeUI === Theme.Dark ? "Light UI" : "Dark UI"}`}</span>
        </div>
        <div
          className="sidebar-settings-option-container"
          onClick={() =>
            setSidebarCollapsed(
              sidebarCollapsed === SidebarCollapsed.False
                ? SidebarCollapsed.True
                : SidebarCollapsed.False
            )
          }
        >
          <span
            className={`sidebar-settings-option-icon ${
              sidebarCollapsed === SidebarCollapsed.False
                ? "collapse"
                : "collapsed"
            }`}
          ></span>
          <span
            className={`${
              sidebarCollapsed === SidebarCollapsed.False
                ? "sidebar-settings-option-body"
                : "sidebar-settings-option-body-collapsed"
            }`}
          >
            Collapse
          </span>
        </div>
        <div className="sidebar-settings-option-container">
          <span className="sidebar-settings-option-icon settings"></span>
          <span
            className={`${
              sidebarCollapsed === SidebarCollapsed.False
                ? "sidebar-settings-option-body"
                : "sidebar-settings-option-body-collapsed"
            }`}
          >
            Settings
          </span>
        </div>
        <div
          className="sidebar-settings-option-container"
          onClick={() => handleLogout()}
        >
          <span className="sidebar-settings-option-icon logout"></span>
          <span
            className={`${
              sidebarCollapsed === SidebarCollapsed.False
                ? "sidebar-settings-option-body"
                : "sidebar-settings-option-body-collapsed"
            }`}
          >
            Log Out
          </span>
        </div>
        <div className="sidebar-settings-option-container">
          <span className="sidebar-settings-option-icon help"></span>
          <span
            className={`${
              sidebarCollapsed === SidebarCollapsed.False
                ? "sidebar-settings-option-body"
                : "sidebar-settings-option-body-collapsed"
            }`}
          >
            Help
          </span>
        </div>
      </div>
    </div>
  );
};

export default SidebarComponent;
