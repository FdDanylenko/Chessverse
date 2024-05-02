import React, { FC, useContext } from "react";
import LostPieces from "./LostPieces";
import { Board } from "../models/Board";
import PlayerTimer from "./PlayerTimer";
import { Player } from "../models/Player";
import { GameDataContext } from "../contexts/gameContext";

interface PlayerInfoComponentProps {
  board: Board;
  currentPlayer: Player | null;
  // timeSet: number;
  swapPlayer: () => void;
}

const PlayerInfoComponent = () => {
  // const PlayerInfoComponent: FC<PlayerInfoComponentProps> = ({board, currentPlayer, timeSet, swapPlayer}) => {
  const { board, currentPlayer, swapPlayer } = useContext(GameDataContext);
  return (
    <div className="info-section">
      <div className="player-info">
        <div className="player-icon"></div>
        <div className="sub-info-box">
          <div className="player-name">White player</div>
          <LostPieces pieces={board.blackLostPieces} />
        </div>
      </div>
      {/* <PlayerTimer
        currentPlayer={currentPlayer}
        timeSet={timeSet}
        board={board}
        swapPlayer={swapPlayer}
      /> */}
    </div>
  );
};

export default PlayerInfoComponent;
