import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    /* Main container */
    <div className="home-container">
      <img
        className="smartcare-logo"
        src={`${process.env.PUBLIC_URL}/images/Smart_care-logo.png`}
        alt="Smart Care Logo"
      />
          {/* Header */}
      <h2>Welcome Back</h2>
      <p>To enter our dashboard, please press login</p>
         {/* link to login page direct */}
      <Link to="/login">
        <button className="login-button"><i className="fa fa-sign-in"></i> Login</button>
      </Link>
    </div>
  );
};

export default Home;
