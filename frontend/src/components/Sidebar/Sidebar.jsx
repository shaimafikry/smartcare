import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';
import { postData } from "../../api";
import { useNavigate } from 'react-router-dom';


const Sidebar = ({ role, onReloadClick, department }) => {
	const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
	const [redirectUrl, setRedirectUrl]=useState('');

	 // useEffect to set the redirect URL based on the role and department
	 useEffect(() => {
    switch (role) {
      case 'doctor':
      case 'nurse':
        setRedirectUrl(`/patients/${department}`);
        console.log('User is a nurse or doctor');
        break;
      case 'manager':
        setRedirectUrl('/users');
        console.log('User is a manager', redirectUrl);
        break;
      case 'receptionist':
        setRedirectUrl('/patients/addNewPatient');
        console.log('User is a receptionist');
        break;
      default:
        setRedirectUrl('/login');
        console.log('User role is unknown');
    }
  }, [role, department, redirectUrl]); //re-run this effect when role or department changes

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




	const handleLogout = async () => {
		try {
			const data = await postData('signout');
			console.log(data);
			localStorage.removeItem('token'); // or session storage
			// Redirect to login page or home
			document.cookie = "token=; path=/login;";
			navigate('/login');
		} catch (error) {
			console.error("something happend during signout", error);
		}};

  return (
    <div>
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
						<Link className="sidebar-link" to={redirectUrl} onClick={onReloadClick}>Dashboard</Link>
						<Link className="sidebar-link" to={'profile'} onClick={onReloadClick}>Profile</Link>
						<Link className="sidebar-link" to={'patients'} onClick={onReloadClick}>All Patients</Link>
						<Link className="sidebar-link" to='*' onClick={handleLogout} >Sign Out</Link>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
