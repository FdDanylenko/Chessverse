import React, { FC, useContext, useEffect, useState } from "react";
import LostPieces from "./LostPieces";
import { Board } from "../models/Board";
import PlayerTimer from "./WhitePlayerTimer";
import { Player } from "../models/Player";
import { GameDataContext } from "../contexts/gameContext";
import { GameModes } from "../models/GameModes";
import useAuth from "../../../hooks/useAuth";
import { Colors } from "../models/Colors";
import server from "../../../api/server";

interface PlayerInfoComponentProps {
  board: Board;
  currentPlayer: Player | null;
  // timeSet: number;
  swapPlayer: () => void;
}

const PlayerInfoComponent = () => {
  // const PlayerInfoComponent: FC<PlayerInfoComponentProps> = ({board, currentPlayer, timeSet, swapPlayer}) => {
  const {
    gameMode,
    board,
    currentPlayer,
    swapPlayer,
    playerColor,
    opponentUsername,
  } = useContext(GameDataContext);
  const { user } = useAuth();
  const [opponentElo, setOpponentElo] = useState();
  // useEffect(() => {
  //   if (opponentUsername !== "Opponent") {
  //     const handleGetUserElo = async () => {
  //       const response = await server.post("/users/getUserData", {
  //         username: `${opponentUsername}`,
  //       });
  //       try {
  //         setOpponentElo(response.data.elo);
  //       } catch (err) {}
  //     };
  //     handleGetUserElo();
  //   }
  // }, [opponentUsername]);

  return (
    <div className="info-section">
      <div className="player-info">
        <img
          className="home-profile-picture player-icon"
          src={`${
            playerColor === Colors.WHITE
              ? user.profilePicture
              : gameMode === GameModes.ONLINE
              ? `http://localhost:5000/db/images/${opponentUsername}.jpg`
              : `http://localhost:5000/db/images/default.jpg`
          }`}
        ></img>
        <div className="sub-info-box">
          <div
            className="player-name"
            style={{ display: "inline-block", width: "fit-content" }}
          >
            {playerColor === Colors.WHITE
              ? user.username
              : opponentUsername || "Opponent"}
          </div>
          {gameMode === GameModes.ONLINE && (
            <div
              className="player-name"
              style={{ display: "inline-block", width: "fit-content" }}
            >
              {playerColor === Colors.WHITE
                ? `[${user.elo}]`
                : `[???]` || "500"}
            </div>
          )}
          <LostPieces pieces={board.blackLostPieces} />
        </div>
      </div>
      {gameMode === GameModes.ONLINE ? <PlayerTimer /> : <></>}
    </div>
  );
};

export default PlayerInfoComponent;
