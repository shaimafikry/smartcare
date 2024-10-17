import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import { fetchData } from '../../api';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const sidebar = document.querySelector('.sidebar-container');
      const hamburgerMenu = document.querySelector('.hamburger-menu');

      if (isOpen && !sidebar.contains(event.target) && !hamburgerMenu.contains(event.target)) {
        closeSidebar();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  // search Api //
  const handleSearch = async () => {
    try {
      const results = await fetchData(`search?term=${searchTerm}`);
      setSearchResults(results);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div>
      {/* Hamburger Menu Button */}
      <div className="hamburger-menu" onClick={toggleSidebar}>
        <div className="hamburger-icon">
          <div></div>
          <div></div>
          <div></div>
        </div>
        <span className="menu-text">{isOpen ? 'Close Sidebar' : 'Open Sidebar'}</span>
      </div>

      {/* Sidebar Container */}
      <div className={`sidebar-container ${isOpen ? 'open' : ''}`}>
        <div className="sidebar p-3">
          {/* Sidebar Header */}
          <div className="sidebar-header mb-4 text-center">
            <img src={`${process.env.PUBLIC_URL}/images/Smart_care-logo.png`} alt="Smart Care Logo" className="img-fluid" />
          </div>
          
          {/* search-input */}
          <div className="mb-3">
            <input
              type="search"
              className="custom-search-input form-control"
              placeholder="Search ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </div>

          {/* search result*/}
          <div className="search-results">
            <div className="results-frame">
              {searchResults.length > 0 ? (
                <ul className="list-group">
                  {searchResults.map((result, index) => (
                    <li key={index} className="list-group-item result-item">{result}</li>
                  ))}
                </ul>
              ) : (
                searchTerm && <p className="no-results">No results found</p>
              )}
            </div>
          </div>

          {/* Sidebar Navigation */}
          <nav className="sidebar-nav">
            <a className="sidebar-link btn btn-link" href="/home">Home</a>
            <a className="sidebar-link btn btn-link" href="/profile">Profile</a>
            <a className="sidebar-link btn btn-link" href="/settings">Settings</a>
            <a className="sidebar-link btn btn-link" href="/sign-out">Sign Out</a>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
