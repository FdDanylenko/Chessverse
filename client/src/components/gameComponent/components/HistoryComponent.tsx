import React, {
  FC,
  useEffect,
  useCallback,
  useRef,
  useState,
  useContext,
} from "react";
import { GameDataContext } from "../contexts/gameContext";

interface Iteration {
  index: number;
  white: string;
  black: string;
}

const HistoryComponent = () => {
  const { board } = useContext(GameDataContext);
  const lastElementRef = useRef<HTMLDivElement>(null);
  const [moves, setMoves] = useState<Iteration[]>([
    { index: 1, white: "g", black: "h" },
    { index: 1, white: "g", black: "h" },
    { index: 1, white: "g", black: "h" },
    { index: 1, white: "g", black: "h" },
    { index: 1, white: "g", black: "h" },
    { index: 1, white: "g", black: "h" },
    { index: 1, white: "g", black: "h" },
    { index: 1, white: "g", black: "h" },
    { index: 1, white: "g", black: "h" },
    { index: 1, white: "g", black: "h" },
    { index: 1, white: "g", black: "h" },
    { index: 1, white: "g", black: "h" },
    { index: 1, white: "g", black: "h" },
    { index: 1, white: "g", black: "h" },
    { index: 1, white: "g", black: "h" },
    { index: 1, white: "g", black: "h" },
    { index: 1, white: "g", black: "h" },
    { index: 1, white: "g", black: "h" },
    { index: 1, white: "g", black: "h" },
    { index: 1, white: "g", black: "h" },
    { index: 1, white: "g", black: "h" },
    { index: 1, white: "g", black: "h" },
    { index: 1, white: "g", black: "h" },
    { index: 1, white: "g", black: "h" },
  ]);

  useEffect(() => {
    if (board.whiteMoves.length > board.blackMoves.length) {
      if (board.whiteMoves.length) {
        setMoves((prevMoves: any) => {
          const newMoves = [
            ...prevMoves,
            {
              index: board.whiteMoves.length,
              white: board.whiteMoves[board.whiteMoves.length - 1],
              black: "",
            },
          ];
          return newMoves;
        });
      }
    }
    if (board.whiteMoves.length === board.blackMoves.length) {
      if (board.blackMoves.length) {
        setMoves((prevMoves: any) => {
          const newMoves = [...prevMoves];
          newMoves[newMoves.length - 1] = {
            ...newMoves[newMoves.length - 1],
            white: board.whiteMoves[board.whiteMoves.length - 1],
            black: board.blackMoves[board.blackMoves.length - 1],
          };
          return newMoves;
        });
      }
    }
    console.log(moves);
  }, [board.whiteMoves.length, board.blackMoves.length]);

  const scrollToLastElement = useCallback(() => {
    lastElementRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToLastElement();
  }, [moves.length]);

  return (
    <div className="history-box">
      {moves.map((move: any, index: any) => (
        <div
          className="history-box-item"
          key={index}
          ref={index === moves.length - 1 ? lastElementRef : null}
        >
          <div className="history-box-item-index">{move.index}.</div>
          <div className="history-box-item-move">{move.white}</div>
          <div className="history-box-item-move">{move.black}</div>
        </div>
        // <div
        //   className="history-box-item"
        //   key={index}
        //   ref={index === moves.length - 1 ? lastElementRef : null}
        // >
        //   &nbsp;{move}&nbsp;
        // </div>
      ))}
    </div>
  );
};

export default HistoryComponent;
