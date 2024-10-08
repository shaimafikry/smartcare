import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';

const Layout = () => {
  return (
    <div className="app">
      <Header /> {/*import header */}
      <div className="layout-container">
        <Sidebar /> {/* import sidebar */}
        <div className="main-content">
          <Outlet /> {/*other content */}
        </div>
      </div>
    </div>
  );
};

export default Layout;
