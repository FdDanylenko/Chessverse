import React, { FC, useContext } from "react";
import LostPieces from "./LostPieces";
import { Board } from "../models/Board";
import { Player } from "../models/Player";
import BotTimer from "./BlackPlayerTimer";
import { GameDataContext } from "../contexts/gameContext";
import { GameModes } from "../models/GameModes";

interface PlayerInfoComponentProps {
  board: Board;
  currentPlayer: Player | null;
  // timeSet: number;
  swapPlayer: () => void;
}

const PlayerInfoComponent = () => {
  // const PlayerInfoComponent: FC<PlayerInfoComponentProps> = ({board, currentPlayer, timeSet, swapPlayer}) => {
  const { gameMode, timeSet, board, currentPlayer, swapPlayer } =
    useContext(GameDataContext);
  return (
    <div className="info-section">
      <div className="player-info">
        <div className="bot-icon"></div>
        <div className="sub-info-box">
          <div className="player-name">Black player</div>
          <LostPieces pieces={board.whiteLostPieces} />
        </div>
      </div>
      {gameMode === GameModes.ONLINE ? <BotTimer /> : <></>}
    </div>
  );
};

export default PlayerInfoComponent;