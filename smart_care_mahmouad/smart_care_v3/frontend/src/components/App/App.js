
import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import './App.css';
import Layout from '../Layout/Layout'; 
import Login from '../Login/Login';
import Reciptionists from '../Reciptionists/Reciptionists';
import Home from '../Home/Home';
import Profile from '../Profile/Profile';
import Settings from '../Settings/Settings';
import SignOut from '../SignOut/SignOut';
import Manegers from '../Manegers/Manegers';
import Doctors from '../Doctors/Doctors';
import Nurses from '../Nurses/Nurses';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
	{ 
		path: "/signout",
		element: <SignOut />,
	},
	//عدلت الباث عشان فتح علي الهوم غير السايد بار
	{
    path: "/",
    element: <Home />,
  },
    // خليت لكل باث Children  خاصة بيها عشان لما نيجي نكلك علي السايد بار 
    {path: '/', element:<Layout />, 
			children:[
				{ path: "doctor",
					children:[
						{path: "dashboard", element: <ProtectedRoute allowedRoles={['doctor']}> <Doctors /> </ProtectedRoute>},
						{ path: "profile", element: <ProtectedRoute allowedRoles={['doctor']}> <Profile /> </ProtectedRoute>},
						{ path: "settings", element: <ProtectedRoute allowedRoles={['doctor']}> <Settings /> </ProtectedRoute>},
					] },

				{ path: "nurse", 
					children:[
						{path: "dashboard", element: <ProtectedRoute allowedRoles={['nurse']}>  <Nurses /> </ProtectedRoute>},
						{ path: "profile", element: <ProtectedRoute allowedRoles={['nurse']}> <Profile /> </ProtectedRoute>},
						{ path: "settings", element: <ProtectedRoute allowedRoles={['nurse']}> <Settings /> </ProtectedRoute>},
						// { path: "signout", element: <SignOut /> },
				] },
				
				{ path: "manager" ,
						children:[
						{path: "dashboard", element: <ProtectedRoute allowedRoles={['manager']}> <Manegers /> </ProtectedRoute>},
						{ path: "profile", element: <ProtectedRoute allowedRoles={['manager']}> <Profile /> </ProtectedRoute>},
						{ path: "settings", element: <ProtectedRoute allowedRoles={['manager']}> <Settings /> </ProtectedRoute>},
				]},
				
				{ path: "receptionist" ,
						children:[
						{ path: "dashboard", element: <ProtectedRoute allowedRoles={['receptionist']}> <Reciptionists /> </ProtectedRoute>},
						{ path: "profile", element: <ProtectedRoute allowedRoles={['receptionist']}> <Profile /> </ProtectedRoute> },
						{ path: "settings", element: <ProtectedRoute allowedRoles={['receptionist']}> <Settings /></ProtectedRoute> },
				]},
			],
  },
  {
    path: "*",
    element: <Navigate to="/login" />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
