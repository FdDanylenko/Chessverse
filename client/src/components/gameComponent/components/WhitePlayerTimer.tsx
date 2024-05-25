import React, { FC, useContext, useEffect, useRef, useState } from "react";
import { Player } from "../models/Player";
import { Colors } from "../models/Colors";
import { Board } from "../models/Board";
import { GameDataContext } from "../contexts/gameContext";

const PlayerTimer = () => {
  const { playerColor, gameStatus, currentPlayer, timeSet, board, swapPlayer } =
    useContext(GameDataContext);
  const [time, setTime] = useState(timeSet);
  const timer = useRef<null | ReturnType<typeof setInterval>>(null);
  var seconds = Math.floor(time % 60);
  var minutes = Math.floor((time / 60) % 60);

  useEffect(() => {
    if (gameStatus === "started") {
      startTimer();
    }
  }, [currentPlayer, gameStatus]);

  useEffect(() => {
    restartTimer();
  }, [timeSet, gameStatus]);

  useEffect(() => {
    if (board.endGame) {
      clearInterval(timer.current!);
    }
  }, [board.endGame]);

  function restartTimer() {
    setTime(timeSet);
  }

  function startTimer() {
    if (timer.current) {
      clearInterval(timer.current);
    }
    const callBack =
      currentPlayer?.color === Colors.WHITE && gameStatus === "started"
        ? decrementTimer
        : dontDecrementTimer;
    timer.current = setInterval(callBack, 1000);
  }

  function decrementTimer() {
    setTime((prev: any) => {
      if (gameStatus === "started") {
        if (prev > 0) {
          return prev - 1;
        } else {
          clearInterval(timer.current!);
          board.setWinner("Black", "time run out");
          swapPlayer();
          return prev;
        }
      }
    });
  }
  function dontDecrementTimer() {}

  return (
    <div className="timer">
      <p>
        {minutes}:
        {seconds < 10 ? <span>{"0" + seconds}</span> : <span>{seconds}</span>}
      </p>
    </div>
  );
};

export default PlayerTimer;
