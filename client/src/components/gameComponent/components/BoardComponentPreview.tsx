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
}

const BoardComponent = ({ board }: BoardProps) => {
  function click() {
    return;
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
                selected={false}
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
