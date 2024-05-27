import { createContext, FC, useEffect, useState } from "react";
import { Board } from "../models/Board";
import { Player } from "../models/Player";
import { Colors } from "../models/Colors";
import { PiecesNames } from "../models/pieces/PiecesNames";
import { GameModes } from "../models/GameModes";

export const GameDataContext = createContext<any>({});

export const GameDataProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [gameStatus, setGameStatus] = useState<
    "lobby" | "awaiting" | "started" | "ended"
  >("lobby");
  const [board, setBoard] = useState(new Board());
  const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE));
  const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK));
  const [timeSet, setTimeSet] = useState<number>(900);
  const [currentPlayer, setCurrentPlayer] = useState<Player>(whitePlayer);
  const [playerColor, setPlayerColor] = useState<Colors>(Colors.WHITE);
  const [movesCount, setMovesCount] = useState<Number>(0);
  const [opponentUsername, setOpponentUsername] = useState<String>("Opponent");
  const [gameMode, setGameMode] = useState<GameModes>(GameModes.PRESELECTED);
  const [promotionPiece, setPromotionPiece] = useState<PiecesNames>();
  const [isPromotionDialogOpen, setIsPromotionDialogOpen] = useState<
    true | false
  >(false);
  const [isGameResultDialogOpen, setIsGameResultDialogOpen] = useState<
    true | false
  >(false);

  function restart() {
    const newBoard = new Board();
    newBoard.initCells();
    newBoard.addPieces();
    setBoard(newBoard);
    let tempTimeSet = timeSet;
    setTimeSet(0);
    setTimeSet(tempTimeSet);
    setMovesCount(0);
    setGameStatus("lobby");
  }

  function swapPlayer() {
    if (board.endGame) {
      showGameResultDialog();
    }
    setCurrentPlayer(
      currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer
    );
  }

  function showPromotionDialog() {
    setIsPromotionDialogOpen(true);
  }
  function closePromotionDialog() {
    setIsPromotionDialogOpen(false);
  }
  function showGameResultDialog() {
    setIsGameResultDialogOpen(true);
  }
  function closeGameResultDialog() {
    setIsGameResultDialogOpen(false);
  }
  return (
    <GameDataContext.Provider
      value={{
        opponentUsername,
        setOpponentUsername,
        movesCount,
        setMovesCount,
        gameStatus,
        setGameStatus,
        playerColor,
        setPlayerColor,
        gameMode,
        setGameMode,
        board,
        setBoard,
        whitePlayer,
        blackPlayer,
        currentPlayer,
        setCurrentPlayer,
        timeSet,
        setTimeSet,
        promotionPiece,
        setPromotionPiece,
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
      }}
    >
      {children}
    </GameDataContext.Provider>
  );
};
