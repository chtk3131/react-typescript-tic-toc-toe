import React,{useState} from 'react';
import {History,ISquare} from "../interface";
import Board from "./Board";
import Moves from "./Moves";

const Game:React.FC = () => {
  //初期化
  const [history,setHistory] = useState<History[]>([{ squares:Array(9).fill(null) }]);
  const [stepNumber,setStepNumber] = useState<number>(0);
  const [xIsNext,setXIsNext] = useState<Boolean>(true);

  function handleClick(i: number) {
    //固定の範囲の配列を返す
    const _history = history.slice(0,stepNumber + 1);
    //最新は配列の末尾なので
    const current = _history[_history.length - 1];
    //なぜわざわざスライスするのか？
    const squares = current.squares.slice();

    //現在の状況を勝者判定の関数になげる
    if(calculateWinner(squares) || squares[i]) {
      return;
    }

    //プレイヤーによって碁番に表示する文字を変える
    squares[i] = xIsNext?"X":"O";

    //stateの状態を更新
    setHistory(_history.concat([{squares:squares}]));
    setStepNumber(_history.length);
    setXIsNext(!xIsNext);
  }

  //たぶん任意のstepの状態にするために使うやつ
  function jumpTo(step: number) {
    setStepNumber(step);
    setXIsNext((step % 2) === 0);
  }

  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);

  let status;
  if(winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return(
    <div className="game">
      <div className="game-board">
        <Board 
        squares={current.squares}
        onClick={i => handleClick(i)}
        ></Board>
      </div>
      <div className="game-info">
        <div>{status}</div>
        <Moves histories={history} jumpTo={jumpTo}></Moves>
      </div>
    </div>
  );
}

export default Game;

function calculateWinner(squares:Array<ISquare>) {
  //この並びになったら勝ち　のパターン列挙
  const lines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ];

  for(let i = 0; i < lines.length; i++) {
    //配列要素をそれぞれ取得
    const [a,b,c] = lines[i];

    //各添字の値がすべて同じなら勝ち
    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  //3つ並んでいないならnullを返す
  return null;
}