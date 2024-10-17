import React from 'react';
import './Header.css'

const Header = ({ username }) => {
  return (
    <header className="header">
      <div className="user-info">
        {username}
      </div>
    </header>
  );
};

export default Header;
