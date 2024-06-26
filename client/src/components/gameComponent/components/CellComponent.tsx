import React, { FC, useContext, useState } from "react";
import { Cell } from "../models/Cell";
import { Colors } from "../models/Colors";
import { King } from "../models/pieces/King";
import { GameDataContext } from "../contexts/gameContext";
import { GameModes } from "../models/GameModes";

interface CellProps {
  cell: Cell;
  selected: boolean;
  click: (cell: Cell) => void;
}

const CellComponent: FC<CellProps> = ({ cell, selected, click }) => {
  const { gameStatus, gameMode, playerColor } = useContext(GameDataContext);
  return (
    <div
      className={[
        "cell",
        // cell.hinted ? "hinted" : "",
        playerColor === Colors.BLACK ? "rotated" : "",
        cell.color,
        selected ? "selected" : "",
      ].join(" ")}
      onClick={() => {
        if (
          gameStatus === "started" &&
          (!cell.piece ||
            playerColor === cell.piece?.color ||
            gameMode === GameModes.SANDBOX ||
            gameMode === GameModes.PUZZLE ||
            cell.available)
        ) {
          click(cell);
        }
      }}
    >
      {cell.available && !cell.piece && <div className="available"></div>}
      {cell.hinted && <div className="hinted"></div>}
      {cell.available && cell.piece && <div className="availableToTake"></div>}
      {cell.availableToPasant && <div className="enPassant"></div>}
      {(cell.piece as King)?.isCheckMate && (
        <div className="toWhoCheckmate"></div>
      )}
      {(cell.piece as King)?.isCheck && <div className="toWhoCheck"></div>}
      {cell.piece?.logo && <img alt="Cell" src={cell.piece.logo}></img>}
    </div>
  );
};

export default CellComponent;
