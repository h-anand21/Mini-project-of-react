import React from 'react';
import './Controls.css';

const Controls = ({ onReset, onNewRound, firstPlayer, onFirstPlayerChange, matchTarget, onMatchTargetChange, isBotEnabled, onBotChange }) => {
  return (
    <div className="controls controls-single-row">

      {/* Restart Button */}
      <button className="btn btn-orange" onClick={onReset}>
        🔄 Restart Project
      </button>

      {/* Match Target */}
      <div className="settings-pill match-pill">
        <span className="pill-label">🏆 Match:</span>
        <button
          className={`pill-btn ${matchTarget === 5 ? 'active-match' : ''}`}
          onClick={() => onMatchTargetChange(5)}
        >
          First to 5
        </button>
        <button
          className={`pill-btn ${matchTarget === 10 ? 'active-match' : ''}`}
          onClick={() => onMatchTargetChange(10)}
        >
          First to 10
        </button>
      </div>

      {/* Starts First - Blue */}
      <div className="settings-pill starts-pill">
        <span className="pill-label">⚡ Starts First:</span>
        <button
          className={`pill-btn ${firstPlayer === 'X' ? 'active-dev' : ''}`}
          onClick={() => onFirstPlayerChange('X')}
        >
          💻 Developer
        </button>
        <button
          className={`pill-btn ${firstPlayer === 'O' ? 'active-bug' : ''}`}
          onClick={() => onFirstPlayerChange('O')}
        >
          🐞 Bug
        </button>
      </div>

      {/* Bot Mode - Green */}
      <div className="settings-pill match-pill">
        <span className="pill-label">🤖 Play With:</span>
        <button
          className={`pill-btn ${!isBotEnabled ? 'active-match' : ''}`}
          onClick={() => onBotChange(false)}
        >
          Friend
        </button>
        <button
          className={`pill-btn ${isBotEnabled ? 'active-match' : ''}`}
          onClick={() => onBotChange(true)}
        >
          Bot
        </button>
      </div>

    </div>
  );
};

export default Controls;
