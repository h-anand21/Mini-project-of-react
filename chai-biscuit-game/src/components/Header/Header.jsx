import React from 'react';
import './Header.css';
import logoChai from '../../assets/images/logo-chai.png';

const Header = () => {
  return (
    <div className="header">
      <div className="logo-wrapper">
        <img src={logoChai} alt="Chai Logo" className="logo-icon" />
        <h1 className="logo-text">ChaiCode</h1>
      </div>
      <div className="header-pill">
        <span className="code-text">Code</span>
        <span className="vs">vs</span>
        <span className="bug-text">Bug 🐞</span>
      </div>
    </div>
  );
};

export default Header;
