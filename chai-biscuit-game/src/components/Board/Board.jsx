import React from 'react';
import Square from '../Square/Square';
import TurnIndicator from '../Status/TurnIndicator';
import './Board.css';

const Board = ({ squares, onClick, theme, isXNext }) => {
  return (
    <div className="board-dashboard-casing">
      <TurnIndicator isXNext={isXNext} theme={theme} />
      <div className="board">
        {squares.map((square, i) => (
          <Square key={i} value={square} onClick={() => onClick(i)} theme={theme} />
        ))}
      </div>
    </div>
  );
};

export default Board;
