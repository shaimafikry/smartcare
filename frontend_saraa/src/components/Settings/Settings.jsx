import React, { useState } from 'react';
import './Settings.css';

const Settings = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState('English'); // Default language

  // Handle mode toggle
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.className = isDarkMode ? '' : 'dark-mode'; // Toggle body class for dark mode
  };

  // Handle language change
  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  return (
    <div className="settings-page">
      
    <h5>Settings</h5>
      
      
      
      {/* Dark Mode Toggle */}
      <div className="settings-option">
        <label>Dark Mode:</label>
        <button onClick={toggleDarkMode}>
          {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </button>
      </div>

      {/* Language Selection */}
      <div className="settings-option">
        <label>Language:</label>
        <select value={language} onChange={handleLanguageChange}>
          <option value="English">English</option>
          <option value="Arabic">Arabic</option>
        </select>
      </div>

      <div className="settings-option">
        <label>Notifications:</label>
        <button>Enable/Disable</button>
      </div>
    </div>
  );
};

export default Settings;
