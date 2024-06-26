import React, { useState, useEffect, useContext } from "react";
import BoardComponent from "./components/BoardComponent";
import PlayerInfoComponent from "./components/WhitePlayerInfoComponent";
import { Board } from "./models/Board";
import { Player } from "./models/Player";
import { Colors } from "./models/Colors";
import PawnPromotionComponent from "./components/PawnPromotionComponent";
import BotInfoComponent from "./components/BlackPlayerInfoComponent";
import HistoryComponent from "./components/HistoryComponent";
import GameResult from "./components/GameResult";
import BoardTestingInfo from "./components/BoardTestingInfo";
import SideMenu from "./components/SideMenu";
import { GameDataContext, GameDataProvider } from "./contexts/gameContext";
import "./css/index.css";
import { GameModes } from "./models/GameModes";
import { puzzlesNames } from "../../models/puzzles";

function App() {
  const {
    board,
    setBoard,
    whitePlayer,
    blackPlayer,
    playerColor,
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
    gameMode,
    setUpPuzzle,
    setPuzzleStage,
  } = useContext(GameDataContext);

  useEffect(() => {
    restart();
    if (gameMode === GameModes.PUZZLE) {
      setUpPuzzle(puzzlesNames.OnTheBrinckOfZugzwang);
    } else {
      restart();
    }
    setCurrentPlayer(whitePlayer);

    setTimeSet(timeSet);
  }, []);
  useEffect(() => {
    restart();
    if (gameMode === GameModes.PUZZLE) {
      setUpPuzzle(puzzlesNames.OnTheBrinckOfZugzwang);
    } else {
      restart();
    }
    setCurrentPlayer(whitePlayer);
    setPuzzleStage(0);
    setTimeSet(timeSet);
  }, [gameMode]);

  // useEffect(() => {
  //   showPromotionDialog();
  // }, [board]);

  return (
    <div className="GameBoard">
      <div className="game-all-content">
        <>
          <div
            className={`game-field ${
              gameMode === GameModes.PUZZLE ? "puzzle-mode" : ""
            }`}
          >
            {/* <HistoryComponent moves={board.blackMoves} /> */}
            {gameMode !== GameModes.PUZZLE ? (
              playerColor === Colors.WHITE ? (
                <BotInfoComponent />
              ) : (
                <PlayerInfoComponent />
              )
            ) : (
              <></>
            )}
            <PawnPromotionComponent />
            <GameResult />
            <BoardComponent />
            {gameMode !== GameModes.PUZZLE ? (
              playerColor === Colors.WHITE ? (
                <PlayerInfoComponent />
              ) : (
                <BotInfoComponent />
              )
            ) : (
              <></>
            )}
            {/* <HistoryComponent moves={board.whiteMoves} /> */}
          </div>
          <SideMenu />
        </>
      </div>
    </div>
  );
}

export default App;
