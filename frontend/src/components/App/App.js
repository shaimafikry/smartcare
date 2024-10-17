
import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import './App.css';
import Layout from '../Layout/Layout'; 
import Login from '../Login/Login';
import Reciptionists from '../Reciptionists/Reciptionists';
import Home from '../Home/Home';
import Profile from '../Profile/Profile';
import SignOut from '../SignOut/SignOut';
import AllPatients from '../AllPatients/AllPatients';
import Manegers from '../Manegers/Manegers';
import Doctors from '../Doctors/Doctors';
import Nurses from '../Nurses/Nurses';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import EditPatientProfile from '../EditPatientProfile/EditPatientProfile';

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
					] },

				{ path: "nurse", 
					children:[
						{path: "dashboard", element: <ProtectedRoute allowedRoles={['nurse']}>  <Nurses /> </ProtectedRoute>},
						{ path: "profile", element: <ProtectedRoute allowedRoles={['nurse']}> <Profile /> </ProtectedRoute>},
				] },
				
				{ path: "manager" ,
						children:[
						{path: "dashboard", element: <ProtectedRoute allowedRoles={['manager']}> <Manegers /> </ProtectedRoute>},
						{ path: "profile", element: <ProtectedRoute allowedRoles={['manager']}> <Profile /> </ProtectedRoute>},
				]},
				
				{ path: "receptionist" ,
						children:[
						{ path: "dashboard", element: <ProtectedRoute allowedRoles={['receptionist']}> <Reciptionists /> </ProtectedRoute>},
						{ path: "profile", element: <ProtectedRoute allowedRoles={['receptionist']}> <Profile /> </ProtectedRoute> },
				]},
				
				{ path: "patients",
					children:[
						{ path: "", element: <ProtectedRoute allowedRoles={['doctor', 'nurse']}> <AllPatients /> </ProtectedRoute>},

						{path: ":id",
							children:[
								{path: "edit", element:<ProtectedRoute allowedRoles={['doctor', 'nurse']}> <EditPatientProfile /> </ProtectedRoute>}
							]
						},
					]
				},
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
