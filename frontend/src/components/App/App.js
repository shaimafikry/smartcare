import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import './App.css';
import Layout from '../Layout/Layout';
import Login from '../Login/Login';
import Reciptionists from '../Reciptionists/Reciptionists';
import Home from '../Home/Home';
import Profile from '../Profile/Profile';
import AllPatients from '../AllPatients/AllPatients';
import Manegers from '../Manegers/Manegers';
import Doctors from '../Doctors/Doctors';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import EditPatientProfile from '../EditPatientProfile/EditPatientProfile';


const router = createBrowserRouter([
	{
    path: "*",
    element: <Navigate to="/login" />,
  },
  {
    path: "/login",
    element: <Login />,
  },
	
	{
    path: "/",
    element: <Home />,
  },
    {path: '/', element:<Layout />, 
			children:[
				{ path: "profile", element:  <Profile />},
				{ path: "patients",
					children:[
						{ path: "", element: <ProtectedRoute allowedRoles={['doctor', 'nurse', 'manager','receptionist']}> <AllPatients /> </ProtectedRoute>},
            {path: "addNewPatient", element:<ProtectedRoute allowedRoles={['receptionist']}> <Reciptionists /> </ProtectedRoute>},
						{path: ":department", element:<ProtectedRoute allowedRoles={['doctor', 'nurse']}> <Doctors /> </ProtectedRoute>},
						{path: ":id",
							children:[
								{path: "edit", element:<ProtectedRoute allowedRoles={['doctor', 'nurse']}> <EditPatientProfile /> </ProtectedRoute>},	]},]},
				{ path: "users",
					children:[
						{ path: "", element:<ProtectedRoute allowedRoles={['manager']}> <Manegers /> </ProtectedRoute> },]}],
  },

]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
