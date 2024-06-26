import React, { FC, useContext, useEffect, useRef, useState } from "react";
import { Board } from "../models/Board";
import CellComponent from "./CellComponent";
import { Cell } from "../models/Cell";
import userEvent from "@testing-library/user-event";
import { Player } from "../models/Player";
import { King } from "../models/pieces/King";
import { PiecesNames } from "../models/pieces/PiecesNames";
import { Colors } from "../models/Colors";
import { bot } from "../models/bot";
import { io } from "socket.io-client";
import { socket } from "../socket";
import { Piece } from "../models/pieces/Piece";
import { GameDataContext } from "../contexts/gameContext";
import { GameModes } from "../models/GameModes";
import { format } from "date-fns";
import useAuth from "../../../hooks/useAuth";
import Puzzles, { puzzlesNames } from "../../../models/puzzles";
import _ from "lodash";
import server from "../../../api/server";

const BoardComponent = () => {
  let moveSound = require("./../assets/move-self.mp3");
  let captureSound = require("./../assets/capture.mp3");
  function PlaySound(sound: any) {
    new Audio(sound).play();
  }
  const { user } = useAuth();
  const {
    timeSet,
    gameStatus,
    setGameStatus,
    gameMode,
    playerColor,
    setPlayerColor,
    board,
    setBoard,
    currentPlayer,
    setCurrentPlayer,
    swapPlayer,
    setIsGameResultDialogOpen,
    movesCount,
    setMovesCount,
    opponentUsername,
    setOpponentUsername,
    opponent,
    setOpponent,
    setChat,
    puzzleStage,
    setPuzzleStage,
    currentPuzzle,
    setCurrentPuzzle,
    prevInteractedCell,
    setPrevInteractedCell,
  } = useContext(GameDataContext);
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);
  // const [opponent, setOpponent] = useState("");
  const opponentRef = useRef(opponent);
  const gameStatusRef = useRef(gameStatus);
  const [socketId, setSocketId] = useState("");

  const PuzzlesEnumValues = Object.values(puzzlesNames) as puzzlesNames[];
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(
    PuzzlesEnumValues.indexOf(currentPuzzle)
  );
  useEffect(() => {
    setCurrentPuzzleIndex(PuzzlesEnumValues.indexOf(currentPuzzle));
  }, [currentPuzzle]);

  useEffect(() => {
    opponentRef.current = opponent;
    gameStatusRef.current = gameStatus;
  }, [opponent, gameStatus]);

  useEffect(() => {
    setIsGameResultDialogOpen(false);
    if (gameMode === GameModes.ONLINE) {
      socket.on("connect", () => {
        if (socket.id) {
          setSocketId(socket.id);
          setMovesCount(0);
        }
      });
    }
    return () => {
      if (gameStatusRef.current === "started") {
        board.setWinner(getOppositeColor(playerColor), "Resigned");
        socket.emit("resigned", opponentRef.current);
        sendGameResults("resigning", "lost");
        setGameStatus("ended");
        setChat([]);
        setOpponentUsername("");
        setOpponent("");
        setCurrentPlayer(Colors.WHITE);
        socket.off("connect");
      }
    };
  }, []);

  useEffect(() => {
    if (gameStatus === "awaiting") {
      socket.emit(
        "fetch-opponent",
        { id: socket.id, username: user.username, timeSet },
        (response: any) => {
          setGameStatus("started");
          setOpponent(response.opponent.id);
          setOpponentUsername(response.opponent.username);
          setPlayerColor(Colors.BLACK);
        }
      );
    }
  }, [gameStatus]);

  useEffect(() => {
    if (true) {
      socket.on("receive-opponent", (id, opponentUsername) => {
        setGameStatus("started");
        setOpponent(id);
        setOpponentUsername(opponentUsername);
      });
      socket.on("resigned", (id) => {
        sendGameResults("resigning", "won");
        board.setWinner(playerColor, "Resigned");
        setIsGameResultDialogOpen(true);
        setOpponent("");
        setGameStatus("ended");
      });
      return () => {
        socket.off("receive-opponent");
        socket.off("resigned");
      };
    }
  }, [gameStatus]);

  useEffect(() => {
    if (socket == null || gameMode !== GameModes.ONLINE) return;
    socket.on("receive-move", (id, x, y, xx, yy) => {
      setSelectedCell(null);
      setOpponent(id);
      makeMove(board.getCell(x, y), board.getCell(xx, yy));
      updateBoard();
      setMovesCount((prev: any) => {
        return prev + 1;
      });
      checkForGameEnd(true);
    });
    return () => {
      socket.off("receive-move");
    };
  }, [socket, setSelectedCell, setOpponent, board]);

  const sendGameResults = (
    reason: "checkmate" | "stalemate" | "resigning",
    result: "won" | "lost" | "draw"
  ) => {
    if (gameMode === GameModes.ONLINE) {
      socket.emit(
        "gameResult",
        user.username,
        opponentUsername,
        reason,
        result,
        board.whiteMoves.length + board.blackMoves.length,
        format(new Date(), "yyyy-MM-dd")
      );
      let eloShift = result === "won" ? 10 : result === "lost" ? -10 : 0;
      server.post(
        "/users/shiftElo",
        { username: user.username, eloShift: eloShift },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
    }
  };

  function checkForGameEnd(reverse: boolean) {
    let enemyKing: Cell | void = board.findKing(
      board,
      reverse ? currentPlayer.color : getOppositeColor(currentPlayer)
    );
    let myKing: Cell | void = board.findKing(
      board,
      reverse ? getOppositeColor(currentPlayer) : currentPlayer.color
    );
    setMovesCount((prev: any) => {
      return prev + 1;
    });
    if (((enemyKing as Cell).piece as King).isCheckMate) {
      board.setWinner(
        reverse ? getOppositeColor(currentPlayer) : currentPlayer.color,
        "Checkmate"
      );
      sendGameResults("checkmate", "won");
    }
    if (((myKing as Cell).piece as King).isCheckMate) {
      board.setWinner(
        reverse ? currentPlayer.color : getOppositeColor(currentPlayer),
        "Checkmate"
      );
      sendGameResults("checkmate", "lost");
    }
    if (((enemyKing as Cell).piece as King).isStaleMate) {
      board.setWinner("Draw", "StaleMate");
      sendGameResults("stalemate", "draw");
    }
    if (((myKing as Cell).piece as King).isStaleMate) {
      board.setWinner("Draw", "StaleMate");
      sendGameResults("stalemate", "draw");
    }
  }

  // gameMode === GameModes.PUZZLE &&
  //     selectedCell.x === getPuzzleMove("player")?.cell.x &&
  //     selectedCell.y === getPuzzleMove("player")?.cell.y &&
  //     cell.x === getPuzzleMove("player")?.cellToMove.x &&
  //     cell.y === getPuzzleMove("player")?.cellToMove.y

  function click(cell: Cell) {
    if (selectedCell !== null && selectedCell.piece?.canMove(cell)) {
      for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
          board.getCell(row, col).hinted = false;
        }
      }
      cell.piece ? PlaySound(captureSound) : PlaySound(moveSound);
      let catchError: number = selectedCell.movePiece(cell);
      if (catchError === 4) {
        return false;
      }
      checkForGameEnd(false);
      if (gameMode === GameModes.ONLINE) {
        socket.emit(
          "make-move",
          socket.id,
          selectedCell.x,
          selectedCell.y,
          cell.x,
          cell.y,
          opponent
        );
      }
      if (gameMode === GameModes.PUZZLE) {
        if (
          cell.x === getPuzzleMove("player")?.cellToMove.x &&
          cell.y === getPuzzleMove("player")?.cellToMove.y &&
          currentPlayer.color === Puzzles[currentPuzzleIndex].colorToMove
        ) {
          setPuzzleStage((prev: number) => {
            return prev + 1;
          });
          if (
            puzzleStage + 1 ===
            Puzzles[currentPuzzleIndex].playerMoves.length
          ) {
            board.setWinner("Solved", "Solved");
            setIsGameResultDialogOpen(true);
          }
        } else {
          setGameStatus("failedMove");
        }
      }
      setPrevInteractedCell((prev: any) => {
        return [...prev, cell, selectedCell];
      });
      setSelectedCell(null);
      swapPlayer();
    } else {
      if (cell.piece?.color === currentPlayer?.color && !board.endGame) {
        setSelectedCell(cell);
      }
    }
  }

  function makeMove(cell: Cell, targetCell: Cell) {
    cell.movePiece(targetCell);
    targetCell.piece ? PlaySound(captureSound) : PlaySound(moveSound);

    let enemyKing: Cell | void = board.findKing(
      board,
      getOppositeColor(currentPlayer)
    );
    if (gameMode !== GameModes.PUZZLE) {
      let myKing: Cell | void = board.findKing(board, currentPlayer.color);
      if (((enemyKing as Cell).piece as King).isCheckMate) {
        board.setWinner(currentPlayer.color, "Checkmate");
      }
      if (((myKing as Cell).piece as King).isCheckMate) {
        board.setWinner(getOppositeColor(currentPlayer), "Checkmate");
      }
      if (((enemyKing as Cell).piece as King).isStaleMate) {
        board.setWinner("Draw", "StaleMate");
      }
      if (((myKing as Cell).piece as King).isStaleMate) {
        board.setWinner("Draw", "StaleMate");
      }
    }
    swapPlayer();
  }

  function getOppositeColor(currentPlayer: Player) {
    if (currentPlayer.color === Colors.BLACK) {
      return Colors.WHITE;
    } else {
      return Colors.BLACK;
    }
  }

  function getPuzzleMove(side: "player" | "opponent") {
    if (side === "opponent") {
      return {
        cell: board?.getCell(
          Puzzles[currentPuzzleIndex].opponentMoves[puzzleStage - 1].xStart,
          Puzzles[currentPuzzleIndex].opponentMoves[puzzleStage - 1].yStart
        ),
        cellToMove: board?.getCell(
          Puzzles[currentPuzzleIndex].opponentMoves[puzzleStage - 1]
            .xDestination,
          Puzzles[currentPuzzleIndex].opponentMoves[puzzleStage - 1]
            .yDestination
        ),
      };
    }
    if (side === "player") {
      return {
        cell: board.getCell(
          Puzzles[currentPuzzleIndex].playerMoves[puzzleStage].xStart,
          Puzzles[currentPuzzleIndex].playerMoves[puzzleStage].yStart
        ),
        cellToMove: board.getCell(
          Puzzles[currentPuzzleIndex].playerMoves[puzzleStage].xDestination,
          Puzzles[currentPuzzleIndex].playerMoves[puzzleStage].yDestination
        ),
      };
    }
  }

  useEffect(() => {
    if (gameMode === GameModes.COMPUTER && board !== undefined) {
      try {
        if (currentPlayer.color !== playerColor && !board.endGame) {
          const move = bot(board, currentPlayer);
          // let myKing: Cell | void = board.findKing(board, currentPlayer.color);
          if (move?.cell && move.cellToMove) {
            makeMove(move.cell, move.cellToMove);
          } else {
            (
              (board?.findKing(board, currentPlayer.color) as Cell)
                .piece as King
            ).isCheckMate = true;
            board.setWinner(getOppositeColor(currentPlayer), "Checkmate");
          }
          if (
            ((board.findKing(board, currentPlayer.color) as Cell).piece as King)
              .isCheckMate
          ) {
            board.setWinner(getOppositeColor(currentPlayer), "Checkmate");
          }
        }
      } catch (err) {}
    }
    if (
      gameMode === GameModes.PUZZLE &&
      board &&
      gameStatus !== "failedMove" &&
      puzzleStage !== 0
    ) {
      if (currentPlayer.color !== playerColor && !board.endGame) {
        // const move = bot(board, currentPlayer);
        if (
          Puzzles[currentPuzzleIndex].opponentMoves.length ===
          puzzleStage - 1
        ) {
          checkForGameEnd(false);
        } else {
          const move = getPuzzleMove("opponent");
          if (move?.cell && move.cellToMove) {
            makeMove(move.cell, move.cellToMove);
            console.log(move);
          }
        }
      }
    }
  }, [currentPlayer, board, gameStatus]);

  useEffect(() => {
    highlightCells();
  }, [selectedCell]);

  function highlightCells() {
    board.highlightCells(selectedCell);
    updateBoard();
  }

  function updateBoard() {
    const newBoard = board.getCopyBoard();
    setBoard(newBoard);
  }
  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
  }

  return (
    <>
      <div
        className={`board ${playerColor === Colors.BLACK ? "rotated" : ""} ${
          gameMode === GameModes.PUZZLE ? "puzzle-mode" : ""
        }`}
      >
        {/* <div className={`board`}> */}
        {board.cells.map((row: any, index: any) => (
          <React.Fragment key={index}>
            {row.map((cell: any) => (
              <CellComponent
                click={click}
                cell={cell}
                key={cell.id}
                selected={
                  cell.x === selectedCell?.x && cell.y === selectedCell?.y
                }
              />
            ))}
          </React.Fragment>
        ))}
      </div>
      {/* <div style={{ color: "white", position: "absolute", left: "-300px" }}>
        {socketId}
        <button onClick={() => copyToClipboard(socketId)}>Copy ID</button>
        <br />
        {opponent}
        <br />
        <input
          type="text"
          id="opponentId"
          value={opponent}
          onChange={(e) => setOpponent(e.target.value)}
        />
        <button
          onClick={async () => {
            try {
              const text = await navigator.clipboard.readText();
              setOpponent(text);
            } catch (error) {
              console.log("Failed to read clipboard:", error);
            }
          }}
        >
          Paste ID
        </button>
      </div> */}
    </>
  );
};

export default BoardComponent;
