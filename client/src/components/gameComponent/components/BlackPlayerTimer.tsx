import React, { FC, useContext, useEffect, useRef, useState } from "react";
import { Player } from "../models/Player";
import { Colors } from "../models/Colors";
import { Board } from "../models/Board";
import { GameDataContext } from "../contexts/gameContext";

const BotTimer = () => {
  const { gameStatus, playerColor, board, timeSet, currentPlayer, swapPlayer } =
    useContext(GameDataContext);
  const [time, setTime] = useState(timeSet);
  const timer = useRef<null | ReturnType<typeof setInterval>>(null);
  var seconds = Math.floor(time % 60);
  var minutes = Math.floor((time / 60) % 60);

  useEffect(() => {
    startTimer();
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
      currentPlayer?.color === Colors.BLACK && gameStatus === "started"
        ? decrementTimer
        : dontDecrementTimer;
    timer.current = setInterval(callBack, 1000);
  }

  function decrementTimer() {
    setTime((prev: any) => {
      if (prev > 0) {
        return prev - 1;
      } else {
        clearInterval(timer.current!);
        board.setWinner("White", "time run out");
        swapPlayer();
        return prev;
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

export default BotTimer;
