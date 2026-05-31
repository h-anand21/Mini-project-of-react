import React from 'react';
import './ThemeSelector.css';

const ThemeSelector = ({ currentTheme, onThemeChange }) => {
  const themes = [
    { id: 'green', color: '#7EA04D' },
    { id: 'orange', color: '#FF9D00' },
    { id: 'purpal', color: '#9b59b6' },
    { id: 'bule', color: '#3498db' }
  ];

  return (
    <div className="theme-selector-container">
      <div className="theme-title">Theme</div>
      <div className="theme-options">
        {themes.map(theme => (
          <div
            key={theme.id}
            className={`theme-circle ${currentTheme === theme.id ? 'active' : ''}`}
            style={{ backgroundColor: theme.color }}
            onClick={() => onThemeChange(theme.id)}
            title={`Switch to ${theme.id} theme`}
          />
        ))}
      </div>
    </div>
  );
};

export default ThemeSelector;
