import React, { useState, useEffect, useContext } from "react";
import BoardComponent from "./components/BoardComponent";
import PlayerInfoComponent from "./components/PlayerInfoComponent";
import { Board } from "./models/Board";
import { Player } from "./models/Player";
import { Colors } from "./models/Colors";
import PawnPromotionComponent from "./components/PawnPromotionComponent";
import BotInfoComponent from "./components/BotInfoComponent";
import HistoryComponent from "./components/HistoryComponent";
import GameResult from "./components/GameResult";
import BoardTestingInfo from "./components/BoardTestingInfo";
import SideMenu from "./components/SideMenu";
import { GameDataContext, GameDataProvider } from "./contexts/gameContext";
import "./css/index.css";

function App() {
  const {
    board,
    setBoard,
    whitePlayer,
    blackPlayer,
    currentPlayer,
    setCurrentPlayer,
    timeSet,
    setTimeSet,
    isPromotionDialogOpen,
    setIsPromotionDialogOpen,
    isGameResultDialogOpen,
    setIsGameResultDialogOpen,
    restart,
    swapPlayer,
    showPromotionDialog,
    closePromotionDialog,
    showGameResultDialog,
    closeGameResultDialog,
  } = useContext(GameDataContext);

  useEffect(() => {
    restart();
    setCurrentPlayer(whitePlayer);
    // setTimeSet(timeSet);
  }, []);

  // useEffect(() => {
  //   showPromotionDialog();
  // }, [board]);

  return (
    <div className="GameBoard">
      <div className="game-all-content">
        <>
          <div className="game-field">
            {/* <HistoryComponent moves={board.blackMoves} /> */}
            <BotInfoComponent />
            <PawnPromotionComponent />
            <GameResult />
            <BoardComponent />
            <PlayerInfoComponent />
            {/* <HistoryComponent moves={board.whiteMoves} /> */}
          </div>
          <SideMenu board={board} setBoard={setBoard} restart={restart} />
        </>
      </div>
    </div>
  );
}

export default App;