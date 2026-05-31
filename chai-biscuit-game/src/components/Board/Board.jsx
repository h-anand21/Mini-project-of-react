import React from 'react';
import Square from '../Square/Square';
import './Board.css';

const Board = ({ squares, onClick, theme }) => {
  return (
    <div className="board-container">
      <div className="board">
        {squares.map((square, i) => (
          <Square key={i} value={square} onClick={() => onClick(i)} theme={theme} />
        ))}
      </div>
    </div>
  );
};

export default Board;
