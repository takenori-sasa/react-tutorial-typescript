import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Repeat } from "typescript-tuple"; // for Board
// Squareパート:一個の四角だけ担当
type SquareState = "O" | "X" | null;
type SquareProps = {
  value: SquareState;
  onClick: () => void;
};
const Square = (props: SquareProps) => (
  <button className="square" onClick={props.onClick}>
    {props.value}
  </button>
);

// Boardパート:Square9つ分
type BoardState = Repeat<SquareState, 9>;
type BoardProps = {
  squares: BoardState;
  onClick: (i: number) => void;
};

const Board = (props: BoardProps) => {
  const renderSquare = (i: number) => (
    <Square value={props.squares[i]} onClick={() => props.onClick(i)} />
  );

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
};
// Gameパート:手番とか色々もっててBoardをたくさん持ってる
type Step = {
  squares: BoardState;
  xIsNext: boolean;
};
type GameState = {
  readonly history: Step[];
  readonly stepNumber: number;
};

const Game = () => {
  const [state, setState] = useState<GameState>({
    history: [
      {
        squares: [null, null, null, null, null, null, null, null, null],
        xIsNext: true,
      },
    ],
    stepNumber: 0,
  });
  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current.squares} onClick={handleClick} />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
};

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
