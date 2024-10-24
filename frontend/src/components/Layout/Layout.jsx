import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';
import { useNavigate } from 'react-router-dom';
import { decodeJWT } from '../../utils';


const Layout = () => {
  
	const [role, setRole] = useState(null);
	const [name, setName] = useState(null);
	const [key, setKey] = useState(0); // State for the dashboard key
	const [department, setDepartment] = useState(null);


  const navigate = useNavigate();

	useEffect(() => {
		// Get the token from sessionStorage
		const token = sessionStorage.getItem('token');
		// console.log('Decoded and Verified JWT:', token);
		if (token) {
		// Decode the token
		const decoded = decodeJWT(token);
		// console.log('Decoded and Verified JWT:', decoded);
		// Access the role from the decoded token
		const role = decoded.role;
		const name = decoded.name;
		const department= decoded.department;
		// add role to the layout
		setRole(role);
		setName(name);
		setDepartment(department);
		} else {
			console.log('No token found in sessionStorage');
			navigate('/login');
		}
	}, [navigate]);


	
	const handleReloadClick = () => {
    setKey(prevKey => prevKey + 1); // Increment the key to force reload
		// i can import the handlereload from utilis to delay the reload
  };


  return (
    <div className="app">
      <Header username={name}/> {/*import header */}
      <div className="layout-container">
        <Sidebar role={role} onReloadClick={handleReloadClick} department={department} /> {/* import sidebar */}
        <div className="main-content">
				  <Outlet key={key} /> {/*other content */}
        </div>
      </div>
    </div>
  );
};

export default Layout;
