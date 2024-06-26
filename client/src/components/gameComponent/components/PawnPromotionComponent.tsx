import React, { FC, useContext } from "react";
import { PiecesNames } from "../models/pieces/PiecesNames";
import whiteQueenLogo from "../assets/pieces-png/queen-w.png";
import whiteBishopLogo from "../assets/pieces-png/bishop-w.png";
import whiteKnightLogo from "../assets/pieces-png/knight-w.png";
import whiteRookLogo from "../assets/pieces-png/rook-w.png";
import { GameDataContext } from "../contexts/gameContext";

interface PromotionDialogProps {
  isPromotionDialogOpen: boolean;
  setIsPromotionDialogOpen: (isPromotionDialogOpen: boolean) => void;
  closeDialog: () => void;
}

const PawnPromotionComponent = () => {
  const {
    board,
    isPromotionDialogOpen,
    setIsPromotionDialogOpen,
    setPromotionPiece,
    closePromotionDialog,
  } = useContext(GameDataContext);

  function selectPiece(PieceName: PiecesNames) {
    setPromotionPiece(PieceName);
    closePromotionDialog();
  }

  if (!isPromotionDialogOpen) {
    return null;
  } else {
    return (
      <div className="promotion-dialog">
        <div className="pieces-box">
          <div
            className={"piece-icon"}
            onClick={() => selectPiece(PiecesNames.QUEEN)}
          >
            <img src={whiteQueenLogo}></img>
          </div>
          <div
            className={"piece-icon"}
            onClick={() => selectPiece(PiecesNames.ROOK)}
          >
            <img src={whiteBishopLogo}></img>
          </div>
          <div
            className={"piece-icon"}
            onClick={() => selectPiece(PiecesNames.BISHOP)}
          >
            <img src={whiteKnightLogo}></img>
          </div>
          <div
            className={"piece-icon"}
            onClick={() => selectPiece(PiecesNames.KNIGHT)}
          >
            <img src={whiteRookLogo}></img>
          </div>
        </div>
      </div>
    );
  }
};
export default PawnPromotionComponent;
