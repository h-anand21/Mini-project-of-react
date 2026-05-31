import React from 'react';
import './Controls.css';

const Controls = ({ onReset, onNewRound }) => {
  return (
    <div className="controls">
      <button className="btn btn-green" onClick={onNewRound}>
        🚀 New Commit
      </button>
      <button className="btn btn-orange" onClick={onReset}>
        🔄 Restart Project
      </button>
      <button className="btn btn-red" onClick={() => {}}>
        🐞 Fix Bugs
      </button>
    </div>
  );
};

export default Controls;
