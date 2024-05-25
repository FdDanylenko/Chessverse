import React, { FC, useContext, useState } from "react";
import { Cell } from "../models/Cell";
import { Colors } from "../models/Colors";
import { King } from "../models/pieces/King";
import { GameDataContext } from "../contexts/gameContext";

interface CellProps {
  cell: Cell;
  selected: boolean;
  click: (cell: Cell) => void;
}

const CellComponent: FC<CellProps> = ({ cell, selected, click }) => {
  const { gameStatus, playerColor } = useContext(GameDataContext);
  return (
    <div
      className={[
        "cell",
        playerColor === Colors.BLACK ? "rotated" : "",
        cell.color,
        selected ? "selected" : "",
      ].join(" ")}
      onClick={() => {
        if (
          gameStatus === "started" &&
          (!cell.piece || playerColor === cell.piece?.color || cell.available)
        ) {
          click(cell);
        }
      }}
    >
      {cell.available && !cell.piece && <div className="available"></div>}
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
