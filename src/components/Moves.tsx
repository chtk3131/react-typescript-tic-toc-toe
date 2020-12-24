import React from 'react'
import {History} from "../interface"

interface MovesProps {
  histories:History[];
  jumpTo:(i:number) => void;
}

const Moves:React.FC<MovesProps> = ({histories,jumpTo}) => {
  return (
    <ol>
      {
        histories.map((val,idx) => {
          const desc = idx ? `Go To Move #${idx}` : "Go To Game";
          
          return (
            <li key={idx}>
            <button onClick={() => jumpTo(idx)}>{desc}</button>
            </li>
          );
        })
      }
    </ol>
  );
}

export default Moves;