import React from 'react';
import { Navigate } from 'react-router-dom';
import { decodeJWT  } from '../../utils';


export default function ProtectedRoute({ children, allowedRoles }) {

    const token = sessionStorage.getItem('token'); // Assuming you store the user's role in localStorage
		if (!token) {
        // If there's no token, redirect to the login page
				console.log("no token");
        return <Navigate to="/login" />;
    }

    
    const user = decodeJWT(token); 
    const userRole = user.role;
    
    // Check if the user role is allowed
    if (allowedRoles && !allowedRoles.includes(userRole)) {
        return <Navigate to="/login" />; // Redirect to an unauthorized page or handle it differently
    }

    // If everything is okay, render the children
    return children;
}
