import React from 'react';
import './PlayerCard.css';

const PlayerCard = ({ player, name, score, isActive, icon }) => {
  return (
    <div className={`player-card clay-card ${isActive ? 'active' : ''} ${player}`}>
      <div className="avatar">{icon}</div>
      <h3>{name}</h3>
      <div className="score-box">
        <span>Score</span>
        <span className="score">{score}</span>
      </div>
    </div>
  );
};

export default PlayerCard;
