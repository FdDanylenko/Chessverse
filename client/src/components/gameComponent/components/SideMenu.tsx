import { FC, useContext } from "react";
import { Board } from "../models/Board";
import { Cell } from "../models/Cell";
import { GameDataContext } from "../contexts/gameContext";
import LobbyComponent from "../../LobbyComponent";
import LoaderComponent from "../../LoaderComponent";
import HistoryComponent from "./HistoryComponent";

interface BoardProps {
  board: Board;
  setBoard: (board: Board) => void;
  restart: () => void;
}

const SideMenu = () => {
  const { gameStatus, board, setBoard, restart } = useContext(GameDataContext);
  function resign() {
    // setTimeSet(Math.random());
  }
  return (
    <div className="side-menu">
      {gameStatus === "lobby" ? (
        <LobbyComponent />
      ) : gameStatus === "awaiting" ? (
        <LoaderComponent />
      ) : (
        <div className="side-menu-sections">
          <div className="side-menu-section side-menu-chat"></div>
          <div className="side-menu-section side-menu-history">
            <HistoryComponent />
          </div>
          <div className="side-menu-section side-menu-navigation">
            <button className="game-nav-btn" onClick={() => restart()}>
              New
            </button>
            <button className="game-nav-btn">Previous</button>
            <button className="game-nav-btn">Next</button>
            <button className="game-nav-btn">Resign</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SideMenu;
