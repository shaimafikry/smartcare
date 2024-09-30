import React, { useState } from 'react';
import './Sidebar.css';

const Sidebar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className={`sidebar ${menuOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <button className="sidebar-toggle" onClick={toggleMenu}>
          <img src="https://img.icons8.com/ios-filled/50/000000/menu--v1.png" alt="Menu" />
        </button>
      </div>
      <nav className="sidebar-nav">
        <a className="sidebar-link" href="./Home/Home">Home</a>
        <a className="sidebar-link" href="./Profile/Profile">Profile</a>
        <a className="sidebar-link" href="./All Patients/All Patients">All Patients</a>
        <a className="sidebar-link" href="./Settings/Settings">Settings</a>
        <a className="sidebar-link" href="./Sign Out/Sign Out">Sign Out</a>
      </nav>
    </div>
  );
};

export default Sidebar;
