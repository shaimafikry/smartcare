import React, { useState, useEffect } from 'react';
import './Sidebar.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  // اغلق السايد بار عند الضغط في أي مكان في الصفحة
  useEffect(() => {
    const handleClickOutside = (event) => {
      const sidebar = document.querySelector('.sidebar-container');
      const hamburgerMenu = document.querySelector('.hamburger-menu');

      // تحقق مما إذا كان الضغط خارج السايد بار وزر الهمبورجر
      if (isOpen && !sidebar.contains(event.target) && !hamburgerMenu.contains(event.target)) {
        closeSidebar();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div>
      {/* زر الهمبورجر */}
      <div className="hamburger-menu" onClick={toggleSidebar}>
        <div className="hamburger-icon">
          <div></div>
          <div></div>
          <div></div>
        </div>
        <span className="menu-text">{isOpen ? 'Close Sidebar' : 'Open Sidebar '}</span>
      </div>

      {/* sidebar container */}
      <div className={`sidebar-container ${isOpen ? 'open' : ''}`}>
        <div className="sidebar">
          {/* Sidebar Logo */}
          <div className="sidebar-header">
            <img src={`${process.env.PUBLIC_URL}/images/Smart_care-logo.png`} alt="Smart Care Logo" />
          </div>
          
          {/* Search Bar */}
          <div className="search-bar">
            <input type="search" placeholder="Search" aria-label="Search" />
          </div>

          <nav className="sidebar-nav">
            <a className="sidebar-link" href="/home">Home</a>
            <a className="sidebar-link" href="/profile">Profile</a>
            <a className="sidebar-link" href="/settings">Settings</a>
            <a className="sidebar-link" href="/sign-out">Sign Out</a>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
