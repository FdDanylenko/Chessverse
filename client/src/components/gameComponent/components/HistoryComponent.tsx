import React, { FC, useEffect, useCallback, useRef } from "react";

interface HistoryComponentProps {
  moves: String[];
}

const HistoryComponent: FC<HistoryComponentProps> = ({ moves }) => {
  const lastElementRef = useRef<HTMLDivElement>(null);

  const scrollToLastElement = useCallback(() => {
    lastElementRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToLastElement();
  }, [moves.length]);

  return (
    <div className="history-box">
      {moves.map((move, index) => (
        <div
          className="history-box-item"
          key={index}
          ref={index === moves.length - 1 ? lastElementRef : null}
        >
          &nbsp;{move}&nbsp;
        </div>
      ))}
    </div>
  );
};

export default HistoryComponent;
