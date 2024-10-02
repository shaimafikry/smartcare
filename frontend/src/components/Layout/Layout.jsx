import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';

const Layout = () => {
  return (
    <div className="app">
      <Sidebar /> {/* importing sidebar to pages*/}
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
