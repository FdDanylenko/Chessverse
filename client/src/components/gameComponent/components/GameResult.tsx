import React, { FC, useContext, useEffect } from "react";
import { Player } from "../models/Player";
import { Colors } from "../models/Colors";
import { GameDataContext } from "../contexts/gameContext";

const GameResult = () => {
  // const GameResult: FC<GameResultProps> = ({isGameResultDialogOpen, setIsGameResultDialogOpen, closeDialog, winner, reason, restart, setCurrentPlayer, whitePlayer, setTimeSet}) => {
  const {
    board,
    isGameResultDialogOpen,
    setIsGameResultDialogOpen,
    closeGameResultDialog,
    timeSet,
    setTimeSet,
    restart,
    setGameStatus,
    setCurrentPlayer,
    whitePlayer,
  } = useContext(GameDataContext);

  function openDialog() {
    setIsGameResultDialogOpen(true);
  }

  const closeDialog = () => {
    setIsGameResultDialogOpen(false);
    restartGame();
  };

  function restartGame() {
    restart();
    console.clear();
    setGameStatus("lobby");
    setCurrentPlayer(whitePlayer);
  }
  if (!isGameResultDialogOpen) {
    return null;
  } else {
    return (
      <div className="game-result-window">
        <div className="game-result__decoration"></div>
        <div className="titles-box">
          <div className="game-result__title">
            {board.winner !== "Draw"
              ? board.winner === Colors.WHITE
                ? "White won"
                : "Black won"
              : "Draw"}
          </div>
          <div className="game-result__subtitle">by {board.reason}</div>
        </div>
        <div className="players-box">
          <div className="white-player">
            <div className="game-result__player-icon"></div>
            <div className="game-result__player-name">White player</div>
          </div>
          <span className="vs-text">vs</span>
          <div className="black-player">
            <div className="game-result__player-icon bot"></div>
            <div className="game-result__player-name">Black player</div>
          </div>
        </div>
        <div className="buttons-box">
          <button className="rematch-button" onClick={() => closeDialog()}>
            New game
          </button>
        </div>
      </div>
    );
  }
};

export default GameResult;
