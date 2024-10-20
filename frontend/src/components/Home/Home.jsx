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
        <button className="login-button-home"><i className="fa fa-sign-in"></i>Login</button>
      </Link>


       {/* Footer */}
       <footer className="footer">
         <h6>Contact us at smartcare@gmail.com</h6>
         <h6>&copy;Smartcare 2024 </h6>
      </footer>
    </div>
  );
};

export default Home;
