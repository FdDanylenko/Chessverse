import React, { FC, useContext } from "react";
import LostPieces from "./LostPieces";
import { Board } from "../models/Board";
import PlayerTimer from "./WhitePlayerTimer";
import { Player } from "../models/Player";
import { GameDataContext } from "../contexts/gameContext";
import { GameModes } from "../models/GameModes";
import useAuth from "../../../hooks/useAuth";
import { Colors } from "../models/Colors";

interface PlayerInfoComponentProps {
  board: Board;
  currentPlayer: Player | null;
  // timeSet: number;
  swapPlayer: () => void;
}

const PlayerInfoComponent = () => {
  // const PlayerInfoComponent: FC<PlayerInfoComponentProps> = ({board, currentPlayer, timeSet, swapPlayer}) => {
  const {
    gameMode,
    board,
    currentPlayer,
    swapPlayer,
    playerColor,
    opponentUsername,
  } = useContext(GameDataContext);
  const { user } = useAuth();
  return (
    <div className="info-section">
      <div className="player-info">
        <div className="player-icon"></div>
        <div className="sub-info-box">
          <div className="player-name">
            {playerColor === Colors.WHITE ? user.username : opponentUsername}
          </div>
          <LostPieces pieces={board.blackLostPieces} />
        </div>
      </div>
      {gameMode === GameModes.ONLINE ? <PlayerTimer /> : <></>}
    </div>
  );
};

export default PlayerInfoComponent;
