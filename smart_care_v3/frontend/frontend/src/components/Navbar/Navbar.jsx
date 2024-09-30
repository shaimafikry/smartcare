import React, { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className={`app-container ${menuOpen ? 'menu-open' : ''}`}>
      <nav className="navbar navbar-expand-lg navbar-light navbar-custom">
        <a className="navbar-brand" href='./images/Smart_care-logo'>
          <img src={`${process.env.PUBLIC_URL}/images/Smart_care-logo.png`} alt="Logo" />
        </a>
        <form className="form-inline mx-auto" method="POST" action="/search">
          <div className="input-group">
            <input className="form-control" type="search" placeholder="Search" name="search" aria-label="Search" />
            <div className="input-group-append">
              <button className="btn search-btn" type="submit">
                <i className="fa fa-search"></i>
              </button>
            </div>
          </div>
        </form>
        <div className="username">Username</div>
        <button className="menu-toggle" onClick={toggleMenu}>
          {menuOpen ? 'Close Menu' : 'Open Menu'}
        </button>
      </nav>

      <div className={`sidebar ${menuOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2 className="sidebar-title">Smart Care</h2>
        </div>
        <nav className="sidebar-nav">
          <a className="sidebar-link" href="./Home/Home">Home</a>
          <a className="sidebar-link" href="./Profile/Profile">Profile</a>
          <a className="sidebar-link" href="./All Patients/All Patients">All Patients</a>
          <a className="sidebar-link" href="./Settings/Settings">Settings</a>
          <a className="sidebar-link" href="./Sign Out/Sign Out">Sign Out</a>
        </nav>
      </div>

      <div className="page-content">
        
      </div>
    </div>
  );
};

export default Navbar;
