import { useContext } from "react";
import { GameDataContext } from "./gameComponent/contexts/gameContext";
import { GameModes } from "./gameComponent/models/GameModes";
import { useNavigate } from "react-router-dom";
import promoItemIconComputer from "../assets/home/computer.f36f0d84.svg";
import promoItemIconHandshake from "../assets/home/handshake.8c90be47.svg";
import promoItemIconPlay from "../assets/home/playwhite.cea685ba.svg";
import promoItemIconPuzzles from "../assets/home/puzzles.8f98f891.svg";
import promoItemIconSandbox from "../assets/home/review.b44ad9a4.svg";

const LobbyComponent = () => {
  const { gameMode, setGameMode, setGameStatus, timeSet, setTimeSet } =
    useContext(GameDataContext);
  const navigate = useNavigate();
  const navigateToLobby = (gm: GameModes) => {
    setGameMode(gm);
    setGameStatus("lobby");
    navigate("/play");
  };
  return gameMode === GameModes.PRESELECTED ? (
    <div className="side-menu-container">
      <div className="promo-item-links-container" style={{ height: "357px" }}>
        <div
          className="play-quick-link"
          onClick={() => {
            navigateToLobby(GameModes.SANDBOX);
          }}
        >
          <img
            className="play-quick-link-icon"
            src={promoItemIconSandbox}
          ></img>
          <div className="play-quick-link-body">Play Sandbox</div>
        </div>
        <div
          className="play-quick-link"
          onClick={() => {
            navigateToLobby(GameModes.ONLINE);
          }}
        >
          <img className="play-quick-link-icon" src={promoItemIconPlay}></img>
          <div className="play-quick-link-body">Play 15 | 10</div>
        </div>
        <div className="play-quick-link">
          <img
            className="play-quick-link-icon"
            src={promoItemIconHandshake}
          ></img>
          <div className="play-quick-link-body">Play a Friend</div>
        </div>
        <div
          className="play-quick-link"
          onClick={() => {
            navigateToLobby(GameModes.COMPUTER);
          }}
        >
          <img
            className="play-quick-link-icon"
            src={promoItemIconComputer}
          ></img>
          <div className="play-quick-link-body">Play Computer</div>
        </div>
        <div className="play-quick-link">
          <img
            className="play-quick-link-icon"
            src={promoItemIconPuzzles}
          ></img>
          <div className="play-quick-link-body">Solve Puzzle</div>
        </div>
      </div>
    </div>
  ) : gameMode === GameModes.ONLINE ? (
    <div className="side-menu-container">
      <button className="lobby-game-time">
        <span
          className={`${
            timeSet / 60 <= 5 ? "blitz" : timeSet / 60 <= 30 ? "rapid" : "long"
          }`}
        >
          {Math.ceil(timeSet / 60)} min
        </span>
      </button>
      <div className="lobby-time-setups-container">
        <div className="lobby-time-setups-row-label">Blitz</div>
        <div className="lobby-time-setups-row">
          <div
            className={`lobby-time-setup ${timeSet === 60 ? "active" : ""}`}
            onClick={() => setTimeSet(60)}
          >
            1 min
          </div>
          <div
            className={`lobby-time-setup ${timeSet === 60 * 3 ? "active" : ""}`}
            onClick={() => setTimeSet(60 * 3)}
          >
            3 min
          </div>
          <div
            className={`lobby-time-setup ${timeSet === 60 * 5 ? "active" : ""}`}
            onClick={() => setTimeSet(60 * 5)}
          >
            5 min
          </div>
        </div>
        <div className="lobby-time-setups-row-label">Rapid</div>
        <div className="lobby-time-setups-row">
          <div
            className={`lobby-time-setup ${
              timeSet === 60 * 10 ? "active" : ""
            }`}
            onClick={() => setTimeSet(60 * 10)}
          >
            10 min
          </div>
          <div
            className={`lobby-time-setup ${
              timeSet === 60 * 15 ? "active" : ""
            }`}
            onClick={() => setTimeSet(60 * 15)}
          >
            15 min
          </div>
          <div
            className={`lobby-time-setup ${
              timeSet === 60 * 20 ? "active" : ""
            }`}
            onClick={() => setTimeSet(60 * 20)}
          >
            20 min
          </div>
        </div>
        <div className="lobby-time-setups-row-label">Long</div>
        <div className="lobby-time-setups-row">
          <div
            className={`lobby-time-setup ${
              timeSet === 60 * 30 ? "active" : ""
            }`}
            onClick={() => setTimeSet(60 * 30)}
          >
            30 minutes
          </div>
          <div
            className={`lobby-time-setup ${
              timeSet === 60 * 45 ? "active" : ""
            }`}
            onClick={() => setTimeSet(60 * 45)}
          >
            45 minutes
          </div>
          <div
            className={`lobby-time-setup ${
              timeSet === 60 * 60 - 1 ? "active" : ""
            }`}
            onClick={() => setTimeSet(60 * 60 - 1)}
          >
            1 hour
          </div>
        </div>
      </div>
      <div
        className="lobby-button-play button-green"
        onClick={() => setGameStatus("awaiting")}
      >
        Play
      </div>
    </div>
  ) : (
    <div></div>
  );
};

export default LobbyComponent;
