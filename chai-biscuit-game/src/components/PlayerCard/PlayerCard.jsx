import React from 'react';
import './PlayerCard.css';

const PlayerCard = ({ player, playerNumber, name, subtitle, score, isActive, icon }) => {
  return (
    <div className={`player-card ${isActive ? 'active' : ''} ${player}`}>
      <div className="player-badge">{playerNumber}</div>
      <div className="avatar-frame">
        <div className="avatar">{icon}</div>
      </div>
      <div className="name-plate">
        <h3>{name}</h3>
        <span className="subtitle">({subtitle})</span>
      </div>
      <div className="score-box">
        <span>Score</span>
        <span className="score">{score < 10 ? `0${score}` : score}</span>
      </div>
    </div>
  );
};

export default PlayerCard;
