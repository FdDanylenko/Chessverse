import { FC, useContext, useEffect, useRef, useState } from "react";
import { Board } from "../models/Board";
import { Cell } from "../models/Cell";
import { GameDataContext } from "../contexts/gameContext";
import LobbyComponent from "../../LobbyComponent";
import LoaderComponent from "../../LoaderComponent";
import HistoryComponent from "./HistoryComponent";
import useAuth from "../../../hooks/useAuth";
import { socket } from "../socket";
interface BoardProps {
  board: Board;
  setBoard: (board: Board) => void;
  restart: () => void;
}

const SideMenu = () => {
  const {
    gameStatus,
    board,
    setBoard,
    restart,
    chat,
    setChat,
    opponent,
    setOpponent,
    opponentUsername,
  } = useContext(GameDataContext);
  const { user } = useAuth();
  const opponentUsernameRef = useRef(opponentUsername);
  const [message, setMessage] = useState<string>("");
  const sendMsg = (e: any) => {
    e.preventDefault();
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
  return (
    <div className="side-menu">
      {gameStatus === "lobby" ? (
        <LobbyComponent />
      ) : gameStatus === "awaiting" ? (
        <LoaderComponent />
      ) : (
        <div className="side-menu-sections">
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
          <div className="side-menu-section side-menu-history">
            <HistoryComponent />
          </div>
          <div className="side-menu-section side-menu-navigation">
            <button className="game-nav-btn" onClick={() => restart()}>
              New
            </button>
            <button className="game-nav-btn">Previous</button>
            <button className="game-nav-btn">Next</button>
            <button className="game-nav-btn">Resign</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SideMenu;
