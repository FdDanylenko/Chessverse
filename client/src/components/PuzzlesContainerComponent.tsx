import React, { useContext, useEffect, useState } from "react";
import Puzzles, { puzzlesNames } from "../models/puzzles";
import { GameDataContext } from "./gameComponent/contexts/gameContext";

const PuzzlesContainerComponent = () => {
  const {
    board,
    setBoard,
    setUpPuzzle,
    currentPuzzle,
    setCurrentPuzzle,
    gameStatus,
    setGameStatus,
    puzzleStage,
    currentPlayer,
    setCurrentPlayer,
    playerColor,
    prevInteractedCell,
    setPrevInteractedCell,
    setPuzzleStage,
  } = useContext(GameDataContext);
  const PuzzlesEnumValues = Object.values(puzzlesNames) as puzzlesNames[];
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(
    PuzzlesEnumValues.indexOf(currentPuzzle)
  );
  useEffect(() => {
    setCurrentPuzzleIndex(PuzzlesEnumValues.indexOf(currentPuzzle));
  }, [currentPuzzle]);

  function ShiftPuzzle(shift: number) {
    const currentIndex = PuzzlesEnumValues.indexOf(currentPuzzle);
    const shiftIndex = currentIndex + shift;
    if (
      PuzzlesEnumValues[shiftIndex] !== undefined &&
      shiftIndex < PuzzlesEnumValues.length &&
      shiftIndex >= 0
    ) {
      setCurrentPuzzle(PuzzlesEnumValues[shiftIndex]);
      setUpPuzzle(PuzzlesEnumValues[shiftIndex]);
      setPuzzleStage(0);
    }
  }

  return (
    <>
      <div className="side-menu-container">
        {/* <div className="lobby-puzzles-container"></div> */}
        <div className="puzzles-navigation">
          <div
            className={`puzzle-nav-btn left ${
              currentPuzzleIndex === 0 ? "inactive" : ""
            }`}
            onClick={() => {
              if (currentPuzzleIndex >= 0) {
                ShiftPuzzle(-1);
              }
            }}
          >
            <span className="left"></span>
          </div>
          <div className="puzzle-nav-btn center">Expand</div>
          <div
            className={`puzzle-nav-btn right ${
              currentPuzzleIndex === PuzzlesEnumValues.length - 1
                ? "inactive"
                : ""
            }`}
            onClick={() => {
              if (currentPuzzleIndex < PuzzlesEnumValues.length) {
                ShiftPuzzle(1);
              }
            }}
          >
            <span className="right"></span>
          </div>
        </div>
      </div>
      <div className="side-menu-section side-menu-navigation">
        {gameStatus === "failedMove" ? (
          <button
            className="game-nav-btn wide red"
            onClick={() => {
              setGameStatus("started");
              setCurrentPlayer(playerColor);
              board
                .getCell(
                  prevInteractedCell[prevInteractedCell.length - 2].x,
                  prevInteractedCell[prevInteractedCell.length - 2].y
                )
                .movePiece(
                  board.getCell(
                    prevInteractedCell[prevInteractedCell.length - 1].x,
                    prevInteractedCell[prevInteractedCell.length - 1].y
                  )
                );
              setCurrentPlayer(playerColor);
            }}
          >
            Try again
          </button>
        ) : (
          <button
            className="game-nav-btn wide"
            onClick={() => {
              board.getCell(
                Puzzles[currentPuzzleIndex].playerMoves[puzzleStage].xStart,
                Puzzles[currentPuzzleIndex].playerMoves[puzzleStage].yStart
              ).hinted = true;
              board.getCell(
                Puzzles[currentPuzzleIndex].playerMoves[puzzleStage]
                  .xDestination,
                Puzzles[currentPuzzleIndex].playerMoves[puzzleStage]
                  .yDestination
              ).hinted = true;
              const newBoard = board.getCopyBoard();
              setBoard(newBoard);
            }}
          >
            Hint
          </button>
        )}
        <button
          style={{ marginLeft: "15px" }}
          className="game-nav-btn wide"
          onClick={() => {
            setUpPuzzle(PuzzlesEnumValues[currentPuzzleIndex]);
            setPuzzleStage(0);
          }}
        >
          Restart
        </button>
      </div>
    </>
  );
};

export default PuzzlesContainerComponent;
