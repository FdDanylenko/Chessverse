import React, { FC, useContext, useEffect, useState } from "react";
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

interface BoardProps {
  board: Board;
  setBoard: (board: Board) => void;
  currentPlayer: Player;
  swapPlayer: () => void;
}

const BoardComponent = () => {
  let moveSound = require("./../assets/move-self.mp3");
  let captureSound = require("./../assets/capture.mp3");
  function PlaySound(sound: any) {
    new Audio(sound).play();
  }
  const { board, setBoard, currentPlayer, swapPlayer } =
    useContext(GameDataContext);
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);
  const [opponent, setOpponent] = useState("");
  const [socketId, setSocketId] = useState("");

  useEffect(() => {
    socket.on("connect", () => {
      if (socket.id) {
        setSocketId(socket.id);
      }
    });
  }, []);

  useEffect(() => {
    if (socket == null) return;
    socket.on("receive-move", (id, x, y, xx, yy) => {
      setSelectedCell(null);
      setOpponent(id);
      makeMove(board.getCell(x, y), board.getCell(xx, yy));
      console.log(currentPlayer);
      updateBoard();
    });
    return () => {
      socket.off("receive-move");
    };
  }, [socket, setSelectedCell, setOpponent, board]);

  function click(cell: Cell) {
    if (selectedCell !== null && selectedCell.piece?.canMove(cell)) {
      cell.piece ? PlaySound(captureSound) : PlaySound(moveSound);
      let catchError: number = selectedCell.movePiece(cell);
      if (catchError === 4) {
        return false;
      }
      setSelectedCell(null);
      let enemyKing: Cell | void = board.findKing(
        board,
        getOppositeColor(currentPlayer)
      );
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
      socket.emit(
        "make-move",
        socket.id,
        selectedCell.x,
        selectedCell.y,
        cell.x,
        cell.y,
        opponent
      );
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
    swapPlayer();
  }

  function getOppositeColor(currentPlayer: Player) {
    if (currentPlayer.color === Colors.BLACK) {
      return Colors.WHITE;
    } else {
      return Colors.BLACK;
    }
  }

  // useEffect(() => {
  //   if (currentPlayer.color === Colors.BLACK && !board.endGame) {
  //     // if (!board.endGame) {
  //     const move = bot(board, currentPlayer);
  //     let myKing: Cell | void = board.findKing(board, currentPlayer.color);
  //     if (move?.cell && move.cellToMove) {
  //       makeMove(move.cell, move.cellToMove);
  //     } else {
  //       ((myKing as Cell).piece as King).isCheckMate = true;
  //       board.setWinner(getOppositeColor(currentPlayer), "Checkmate");
  //     }
  //     if (((myKing as Cell).piece as King).isCheckMate) {
  //       board.setWinner(getOppositeColor
  //(currentPlayer), "Checkmate");
  //     }
  //   }
  // }, [currentPlayer, board]);

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
      <div className="board">
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
