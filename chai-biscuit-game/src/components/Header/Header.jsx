import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <div className="header">
      <h1 className="logo">☕ ChaiCode</h1>
      <div className="header-pill">
        <span className="code-text">Code</span>
        <span className="vs">vs</span>
        <span className="bug-text">Bug 🐞</span>
      </div>
    </div>
  );
};

export default Header;
