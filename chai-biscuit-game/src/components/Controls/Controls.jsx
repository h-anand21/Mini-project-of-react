import React from 'react';
import './Controls.css';

const Controls = ({ onReset, onNewRound, firstPlayer, onFirstPlayerChange }) => {
  return (
    <div className="controls">
      <button className="btn btn-green" onClick={onNewRound}>
        🚀 New Commit
      </button>
      <button className="btn btn-orange" onClick={onReset}>
        🔄 Restart Project
      </button>
      <div className="first-player-selector">
        <span className="first-player-label">⚡ Starts First:</span>
        <button
          className={`first-player-btn ${firstPlayer === 'X' ? 'active-dev' : ''}`}
          onClick={() => onFirstPlayerChange('X')}
        >
          💻 Developer
        </button>
        <button
          className={`first-player-btn ${firstPlayer === 'O' ? 'active-bug' : ''}`}
          onClick={() => onFirstPlayerChange('O')}
        >
          🐞 Bug
        </button>
      </div>
    </div>
  );
};

export default Controls;
