import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <div className="header">
      <h1 className="title">
        <span className="icon">☕</span> Chai
        <span className="vs"> VS </span>
        <span className="icon">🍪</span> Biscuit
      </h1>
      <h2 className="subtitle">Tic Tac Toe</h2>
    </div>
  );
};

export default Header;
