import React, { useState } from 'react';
import './Sidebar.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Custom hamburger toggle button */}
      <button className={`toggle-button ${isOpen ? 'open' : ''}`} onClick={toggleSidebar}>
        <div className="hamburger-icon">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </button>

      {/* Sidebar container */}
      <div className={`sidebar-container ${isOpen ? 'open' : ''}`}>
        <div className="sidebar">
          <div className="sidebar-header">
            <img src={`${process.env.PUBLIC_URL}/images/Smart_care-logo.png`} alt="Smart Care Logo" />
          </div>
          <div className="search-bar">
            <input type="search" placeholder="Search" aria-label="Search" />
          </div>
          <nav className="sidebar-nav">
            <a className="sidebar-link" href="./Home/Home">Home</a>
            <a className="sidebar-link" href="./Profile/Profile">Profile</a>
            <a className="sidebar-link" href="./Settings/Settings">Settings</a>
            <a className="sidebar-link" href="./Sign Out/Sign Out">Sign Out</a>
          </nav>
        </div>
      </div>
      {/* Overlay to close sidebar when clicking outside */}
      {isOpen && <div className="overlay" onClick={toggleSidebar}></div>}
    </div>
  );
};

export default Sidebar;
