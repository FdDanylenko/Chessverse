import { createContext, FC, useEffect, useState } from "react";
import { Board } from "../models/Board";
import { Player } from "../models/Player";
import { Colors } from "../models/Colors";
import { PiecesNames } from "../models/pieces/PiecesNames";
import { GameModes } from "../models/GameModes";
import Puzzles, { Puzzle, puzzlesNames } from "../../../models/puzzles";
import _ from "lodash";
import { Cell } from "../models/Cell";

export const GameDataContext = createContext<any>({});

type chatMessage = {
  id: Number;
  author: String;
  message: String;
};

export const GameDataProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [gameStatus, setGameStatus] = useState<
    "lobby" | "awaiting" | "started" | "ended" | "failedMove"
  >("lobby");
  const [chat, setChat] = useState<chatMessage[]>([]);
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
  const [puzzleStage, setPuzzleStage] = useState<Number>(0);
  const [isPromotionDialogOpen, setIsPromotionDialogOpen] = useState<
    true | false
  >(false);
  const [isGameResultDialogOpen, setIsGameResultDialogOpen] = useState<
    true | false
  >(false);
  const [opponent, setOpponent] = useState("");
  const [currentPuzzle, setCurrentPuzzle] = useState(
    puzzlesNames.OnTheBrinckOfZugzwang
  );
  const [prevInteractedCell, setPrevInteractedCell] = useState<Cell[]>([]);

  function restart() {
    const newBoard = new Board();
    newBoard.initCells();
    newBoard.addPieces();
    setBoard(newBoard);
    let tempTimeSet = timeSet;
    setTimeSet(0);
    setTimeSet(tempTimeSet);
    setMovesCount(0);
    setPrevInteractedCell([]);
    if (gameMode === GameModes.PUZZLE) {
      setGameStatus("started");
    } else {
      setGameStatus("lobby");
    }
  }

  function setUpPuzzle(puzzleName: String) {
    const newBoard = new Board();
    newBoard.initCells();
    const puzzle = _.find(Puzzles, { name: puzzleName });
    puzzle?.pieces.forEach((piece) => {
      newBoard.addPiece(piece.name, piece.color, piece.x, piece.y);
    });
    setBoard(newBoard);
    setTimeSet(0);
    setMovesCount(0);
    setPlayerColor(puzzle?.colorToMove || Colors.WHITE);
    setCurrentPlayer(
      puzzle?.colorToMove === Colors.WHITE ? whitePlayer : blackPlayer
    );
    setGameStatus("started");
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
        chat,
        setChat,
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
        opponent,
        setOpponent,
        setUpPuzzle,
        puzzleStage,
        setPuzzleStage,
        currentPuzzle,
        setCurrentPuzzle,
        prevInteractedCell,
        setPrevInteractedCell,
      }}
    >
      {children}
    </GameDataContext.Provider>
  );
};
