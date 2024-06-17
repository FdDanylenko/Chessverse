import { FC, useContext, useEffect, useRef, useState } from "react";
import { Board } from "../models/Board";
import { Cell } from "../models/Cell";
import { GameDataContext } from "../contexts/gameContext";
import LobbyComponent from "../../LobbyComponent";
import LoaderComponent from "../../LoaderComponent";
import HistoryComponent from "./HistoryComponent";
import useAuth from "../../../hooks/useAuth";
import { socket } from "../socket";
import { Colors } from "../models/Colors";
import { GameModes } from "../models/GameModes";
import { puzzlesNames } from "../../../models/puzzles";
import PuzzlesContainerComponent from "../../PuzzlesContainerComponent";
interface BoardProps {
  board: Board;
  setBoard: (board: Board) => void;
  restart: () => void;
}

const SideMenu = () => {
  const {
    gameStatus,
    setGameStatus,
    gameMode,
    board,
    setBoard,
    restart,
    chat,
    setChat,
    opponent,
    setOpponent,
    opponentUsername,
    movesCount,
    setUpPuzzle,
    setCurrentPlayer,
    prevInteractedCell,
    setPrevInteractedCell,
    playerColor,
  } = useContext(GameDataContext);
  const { user } = useAuth();
  const opponentUsernameRef = useRef(opponentUsername);
  const [message, setMessage] = useState<string>("");
  const sendMsg = (e: any) => {
    e.preventDefault();
    // board.addPiece("Pawn", Colors.WHITE, 4, 4);
    socket.emit("send-msg", opponent, message);
    setChat((prev: any) => {
      return [
        ...prev,
        {
          id: prev.length,
          author: user.username,
          message: message,
        },
      ];
    });
    setMessage("");
  };

  useEffect(() => {
    opponentUsernameRef.current = opponentUsername;
  }, [opponentUsername]);

  useEffect(() => {
    socket.on("receive-msg", (message) => {
      setChat((prev: any) => {
        return [
          ...prev,
          {
            id: prev.length,
            author: opponentUsernameRef.current,
            message: message,
          },
        ];
      });
    });
    return () => {
      socket.off("receive-msg");
    };
  }, []);

  function moveBetweenMoves(direction: 1 | -1) {
    let index = movesCount;
    // const newBoard = board.getBoardFromHistory(index + direction);
    setBoard({ ...board, cells: board.boardHistory[0].cells });
  }

  return (
    <div className="side-menu">
      {gameStatus === "lobby" ? (
        <LobbyComponent />
      ) : gameStatus === "awaiting" ? (
        <LoaderComponent />
      ) : (
        <div className="side-menu-sections">
          {gameMode !== GameModes.PUZZLE ? (
            <div className="side-menu-section side-menu-chat">
              <div className="messages-container">
                {chat.map((msg: any) => (
                  <div
                    key={msg.id}
                    className={`message-container ${
                      msg.author === user.username ? "own" : ""
                    }`}
                  >
                    <div className="msg-author-username">{msg.author}</div>
                    <div className="msg-message-container">{msg.message}</div>
                  </div>
                ))}
              </div>
              <form className="msg-input-container" onSubmit={sendMsg}>
                <input
                  id="msg-input"
                  type="text"
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                  }}
                  placeholder="Send a message"
                  autoComplete="none"
                />
              </form>
            </div>
          ) : (
            <PuzzlesContainerComponent />
          )}
          {gameMode !== GameModes.PUZZLE && (
            <div className="side-menu-section side-menu-history">
              <HistoryComponent />
            </div>
          )}
          {gameMode === GameModes.PUZZLE && (
            // <div className="side-menu-section side-menu-navigation">
            //   {gameStatus === "failedMove" ? (
            //     <button className="game-nav-btn wide red" onClick={() => {
            //       setGameStatus("started")
            //     }}>Try again</button>
            //   ) : (
            //     <></>
            //   )}
            //   <button className="game-nav-btn wide">Hint</button>
            // </div>
            <></>
          )}
          {gameMode !== GameModes.PUZZLE && (
            <div className="side-menu-section side-menu-navigation">
              <button className="game-nav-btn">New</button>
              <button
                className="game-nav-btn"
                onClick={() => {
                  console.log(
                    prevInteractedCell[prevInteractedCell.length - 2],
                    prevInteractedCell[prevInteractedCell.length - 1]
                  );
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
                  console.log("done");
                }}
              >
                Back
              </button>
              <button className="game-nav-btn">Forward</button>
              <button className="game-nav-btn">Abort</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SideMenu;
