import { Cell } from "./Cell";
import { Colors } from "./Colors";
import { Bishop } from "./pieces/Bishop";
import { King } from "./pieces/King";
import { Knight } from "./pieces/Knight";
import { Pawn } from "./pieces/Pawn";
import { Piece } from "./pieces/Piece";
import { PiecesNames } from "./pieces/PiecesNames";
import { Queen } from "./pieces/Queen";
import { Rook } from "./pieces/Rook";
import _ from "lodash";

interface move {
  x: number;
  y: number;
  xx: number;
  yy: number;
}

export class Board {
  cells: Cell[][] = [];
  public boardHistory: any[] = [];
  whiteLostPieces: Piece[] = [];
  blackLostPieces: Piece[] = [];
  blackMoves: string[] = [];
  whiteMoves: string[] = [];
  movesHistory: move[] = [];
  blocked: boolean = false;
  public promotionPiece: Piece | null = null;
  public isPromotionDialogOpen: boolean = false;
  public endGame: boolean = false;
  public winner: string = "";
  public reason: string = "";
  public previousPasant: Cell | null = null;
  public promotionDialog: boolean = false;

  public initCells() {
    for (let i = 0; i < 8; i++) {
      const row: Cell[] = [];
      for (let j = 0; j < 8; j++) {
        if ((i + j) % 2 !== 0) {
          row.push(new Cell(this, j, i, Colors.BLACK, null)); //green
        } else {
          row.push(new Cell(this, j, i, Colors.WHITE, null)); //white
        }
      }
      this.cells.push(row);
    }
    this.boardHistory.push({ cells: this.cells });
  }

  public setWinner(_winner: string, _reason: string) {
    this.endGame = true;
    this.winner = _winner;
    this.reason = _reason;
  }
  private capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  public getCopyBoard(): Board {
    const newBoard = new Board();
    newBoard.cells = this.cells;
    newBoard.blackLostPieces = this.blackLostPieces;
    newBoard.whiteLostPieces = this.whiteLostPieces;
    newBoard.blackMoves = this.blackMoves;
    newBoard.whiteMoves = this.whiteMoves;
    newBoard.endGame = this.endGame;
    newBoard.winner = this.winner;
    newBoard.reason = this.reason;
    newBoard.boardHistory = this.boardHistory;
    return newBoard;
  }
  public getBoardFromHistory(index: any): Board {
    const newBoard = new Board();
    _.isEqual(newBoard.cells, this.boardHistory[0].cells);
    newBoard.cells = this.boardHistory[0].cells;
    newBoard.blackLostPieces = this.blackLostPieces;
    newBoard.whiteLostPieces = this.whiteLostPieces;
    newBoard.blackMoves = this.blackMoves;
    newBoard.whiteMoves = this.whiteMoves;
    newBoard.endGame = this.endGame;
    newBoard.winner = this.winner;
    newBoard.reason = this.reason;
    newBoard.boardHistory = this.boardHistory;
    return newBoard;
  }

  public highlightCells(selectedCell: Cell | null) {
    for (let i = 0; i < this.cells.length; i++) {
      const row = this.cells[i];
      for (let j = 0; j < row.length; j++) {
        const target = row[j];
        target.available = !!selectedCell?.piece?.canMove(target);
      }
    }
  }

  public getCell(x: number, y: number) {
    return this.cells[y][x];
  }

  public findKing(board: Board, color: Colors): Cell | void {
    const cells = board.cells.flat();
    return cells.find(
      (cell) =>
        cell.piece &&
        cell.piece?.color === color &&
        cell.piece.name === PiecesNames.KING
    );
  }

  public addPiece(
    piece: string,
    color: Colors.WHITE | Colors.BLACK,
    x: number,
    y: number
  ) {
    switch (piece) {
      case "King":
        new King(color, this.getCell(x, y));
        break;
      case "Queen":
        new Queen(color, this.getCell(x, y));
        break;
      case "Bishop":
        new Bishop(color, this.getCell(x, y));
        break;
      case "Knight":
        new Knight(color, this.getCell(x, y));
        break;
      case "Rook":
        new Rook(color, this.getCell(x, y));
        break;
      case "Pawn":
        new Pawn(color, this.getCell(x, y));
        break;
      default:
        break;
    }
  }

  public addPieces() {
    new King(Colors.WHITE, this.getCell(4, 7));
    new Queen(Colors.WHITE, this.getCell(3, 7));
    new Bishop(Colors.WHITE, this.getCell(2, 7));
    new Bishop(Colors.WHITE, this.getCell(5, 7));
    new Knight(Colors.WHITE, this.getCell(1, 7));
    new Knight(Colors.WHITE, this.getCell(6, 7));
    new Rook(Colors.WHITE, this.getCell(0, 7));
    new Rook(Colors.WHITE, this.getCell(7, 7));
    for (let i = 0; i < 8; i++) {
      new Pawn(Colors.WHITE, this.getCell(i, 6));
    }
    //============================================
    new King(Colors.BLACK, this.getCell(4, 0));
    new Queen(Colors.BLACK, this.getCell(3, 0));
    new Bishop(Colors.BLACK, this.getCell(2, 0));
    new Bishop(Colors.BLACK, this.getCell(5, 0));
    new Knight(Colors.BLACK, this.getCell(1, 0));
    new Knight(Colors.BLACK, this.getCell(6, 0));
    new Rook(Colors.BLACK, this.getCell(0, 0));
    new Rook(Colors.BLACK, this.getCell(7, 0));
    for (let i = 0; i < 8; i++) {
      new Pawn(Colors.BLACK, this.getCell(i, 1));
    }
  }
  public addPiecesPreviewPuzzle() {
    new King(Colors.WHITE, this.getCell(1, 7));
    new Queen(Colors.WHITE, this.getCell(1, 2));
    new Knight(Colors.WHITE, this.getCell(2, 3));
    new Knight(Colors.WHITE, this.getCell(5, 5));
    new Rook(Colors.WHITE, this.getCell(2, 7));
    new Rook(Colors.WHITE, this.getCell(7, 7));
    new Pawn(Colors.WHITE, this.getCell(0, 6));
    new Pawn(Colors.WHITE, this.getCell(1, 6));
    new Pawn(Colors.WHITE, this.getCell(2, 6));
    new Pawn(Colors.WHITE, this.getCell(3, 5));
    new Pawn(Colors.WHITE, this.getCell(4, 4));
    new Pawn(Colors.WHITE, this.getCell(6, 5));
    new Pawn(Colors.WHITE, this.getCell(7, 6));
    //============================================
    new King(Colors.BLACK, this.getCell(1, 0));
    new Queen(Colors.BLACK, this.getCell(4, 0));
    new Bishop(Colors.BLACK, this.getCell(1, 1));
    new Bishop(Colors.BLACK, this.getCell(5, 0));
    new Knight(Colors.BLACK, this.getCell(3, 2));
    new Rook(Colors.BLACK, this.getCell(3, 0));
    new Rook(Colors.BLACK, this.getCell(7, 0));
    new Pawn(Colors.BLACK, this.getCell(0, 2));
    new Pawn(Colors.BLACK, this.getCell(4, 3));
    new Pawn(Colors.BLACK, this.getCell(5, 2));
    new Pawn(Colors.BLACK, this.getCell(6, 1));
    new Pawn(Colors.BLACK, this.getCell(7, 1));
  }
}
