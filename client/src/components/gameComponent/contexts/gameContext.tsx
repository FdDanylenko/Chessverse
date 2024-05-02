import { createContext, FC, useEffect, useState } from "react";
import { Board } from "../models/Board";
import { Player } from "../models/Player";
import { Colors } from "../models/Colors";
import { PiecesNames } from "../models/pieces/PiecesNames";

export const GameDataContext = createContext<any>({});

export const GameDataProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [gameType, setGameType] = useState<"online" | "computer" | "puzzle">(
    "computer"
  );
  const [board, setBoard] = useState(new Board());
  const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE));
  const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK));
  const [timeSet, setTimeSet] = useState<number>(900);
  const [currentPlayer, setCurrentPlayer] = useState<Player>(whitePlayer);
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
    // setTimeSet(Math.random);
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
