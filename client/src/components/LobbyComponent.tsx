import { useContext } from "react";
import { GameDataContext } from "./gameComponent/contexts/gameContext";
import { GameModes } from "./gameComponent/models/GameModes";

const LobbyComponent = () => {
  const { gameMode, setGameStatus, timeSet, setTimeSet } =
    useContext(GameDataContext);
  return gameMode === GameModes.ONLINE ? (
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
