import React from 'react';
import './Controls.css';

const Controls = ({ onReset, onNewRound }) => {
  return (
    <div className="controls">
      <button className="btn btn-primary" onClick={onNewRound}>
        🔄 New Round
      </button>
      <button className="btn btn-secondary" onClick={onReset}>
        ⚙️ Reset Game
      </button>
    </div>
  );
};

export default Controls;
