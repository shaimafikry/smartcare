import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <img
        className="smartcare-logo"
        src={`${process.env.PUBLIC_URL}/images/Smart_care-logo.png`}
        alt="Smart Care Logo"
      />
      <h1>Welcome Back </h1>
      <h5>To enter press Login </h5>
      <Link to="/login">
        <button className="login-button"><i class="fa fa-sign-in"></i>Login</button>
      </Link>
    </div>
  );
};

export default Home;
