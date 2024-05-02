import { FC } from "react";
import { Board } from "../models/Board";
import { Cell } from "../models/Cell";

interface BoardProps {
  board: Board;
  setBoard: (board: Board) => void;
  restart: () => void;
}

const SideMenu: FC<BoardProps> = ({ board, setBoard, restart }) => {
  function resign() {
    // setTimeSet(Math.random());
  }
  return (
    <div className="side-menu">
      <div className="chat"></div>
      <div className="history"></div>
      <div className="navigation">
        <button className="game-nav-btn" onClick={() => restart()}>
          New
        </button>
        <button className="game-nav-btn">Previous</button>
        <button className="game-nav-btn">Next</button>
        <button className="game-nav-btn">Resign</button>
      </div>
    </div>
  );
};

export default SideMenu;
