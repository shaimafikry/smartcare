import React, { useState } from 'react';
import './Sidebar.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* toggle*/}
      <button className="toggle-button" onClick={toggleSidebar}>
        <i className="fas fa-bars"></i>
      </button>
      
      {/*  sidebar container*/}
      <div className={`sidebar-container ${isOpen ? 'open' : 'closed'}`}>
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
            <a className="sidebar-link" href="./All Patients/All Patients">Department</a>
            <a className="sidebar-link" href="./Settings/Settings">Settings</a>
            <a className="sidebar-link" href="./Sign Out/Sign Out">Sign Out</a>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
