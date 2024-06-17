import { Colors } from "../components/gameComponent/models/Colors";
import { PiecesNames } from "../components/gameComponent/models/pieces/PiecesNames";

export type Moves = {
  piece: PiecesNames;
  color: Colors.WHITE | Colors.BLACK;
  xStart: Coords;
  yStart: Coords;
  xDestination: Coords;
  yDestination: Coords;
};
export type Coords = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
export type Piece = {
  name: PiecesNames;
  color: Colors.WHITE | Colors.BLACK;
  x: Coords;
  y: Coords;
};
export interface Puzzle {
  name: String;
  playerMoves: Moves[];
  opponentMoves: Moves[];
  pieces: Piece[];
  colorToMove: Colors.WHITE | Colors.BLACK;
}
export enum puzzlesNames {
  OnTheBrinckOfZugzwang = "On the Brinck of Zugzwang",
}
const Puzzles: Puzzle[] = [
  {
    name: puzzlesNames.OnTheBrinckOfZugzwang,
    playerMoves: [
      {
        piece: PiecesNames.BISHOP,
        color: Colors.WHITE,
        xStart: 0,
        yStart: 3,
        xDestination: 3,
        yDestination: 0,
      },
      {
        piece: PiecesNames.BISHOP,
        color: Colors.WHITE,
        xStart: 1,
        yStart: 3,
        xDestination: 4,
        yDestination: 6,
      },
      {
        piece: PiecesNames.BISHOP,
        color: Colors.WHITE,
        xStart: 3,
        yStart: 0,
        xDestination: 2,
        yDestination: 1,
      },
      {
        piece: PiecesNames.BISHOP,
        color: Colors.WHITE,
        xStart: 4,
        yStart: 6,
        xDestination: 3,
        yDestination: 7,
      },
      {
        piece: PiecesNames.KING,
        color: Colors.WHITE,
        xStart: 6,
        yStart: 7,
        xDestination: 7,
        yDestination: 7,
      },
      {
        piece: PiecesNames.BISHOP,
        color: Colors.WHITE,
        xStart: 2,
        yStart: 1,
        xDestination: 5,
        yDestination: 4,
      },
    ],
    opponentMoves: [
      {
        piece: PiecesNames.KING,
        color: Colors.BLACK,
        xStart: 6,
        yStart: 3,
        xDestination: 6,
        yDestination: 4,
      },
      {
        piece: PiecesNames.KING,
        color: Colors.BLACK,
        xStart: 6,
        yStart: 4,
        xDestination: 6,
        yDestination: 5,
      },
      {
        piece: PiecesNames.ROOK,
        color: Colors.BLACK,
        xStart: 7,
        yStart: 4,
        xDestination: 5,
        yDestination: 4,
      },
      {
        piece: PiecesNames.PAWN,
        color: Colors.BLACK,
        xStart: 7,
        yStart: 5,
        xDestination: 7,
        yDestination: 6,
      },
      {
        piece: PiecesNames.KING,
        color: Colors.BLACK,
        xStart: 6,
        yStart: 5,
        xDestination: 7,
        yDestination: 5,
      },
    ],
    pieces: [
      {
        name: PiecesNames.BISHOP,
        color: Colors.WHITE,
        x: 0,
        y: 3,
      },
      {
        name: PiecesNames.BISHOP,
        color: Colors.WHITE,
        x: 1,
        y: 3,
      },
      {
        name: PiecesNames.KING,
        color: Colors.WHITE,
        x: 6,
        y: 7,
      },
      {
        name: PiecesNames.KING,
        color: Colors.BLACK,
        x: 6,
        y: 3,
      },
      {
        name: PiecesNames.ROOK,
        color: Colors.BLACK,
        x: 7,
        y: 4,
      },
      {
        name: PiecesNames.PAWN,
        color: Colors.BLACK,
        x: 7,
        y: 5,
      },
    ],
    colorToMove: Colors.WHITE,
  },
];

export default Puzzles;
