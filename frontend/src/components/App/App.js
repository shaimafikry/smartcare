import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

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
import EditProfile from '../EditProfile/EditProfile';



const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  
    {path: '/', element:<Layout />, children:[

      { path: "home", element: <Home /> },
      { path: "doctors", element: <Doctors /> },
      { path: "nurses", element: <Nurses /> },
      { path: "profile", element: <Profile /> },
      { path: "manegers", element: <Manegers /> },
      { path: "settings", element: <Settings /> },
      { path: "sign-out", element: <SignOut /> },
      { path: "reciptionists", element: <Reciptionists /> },
      { path: "editProfile", element: <EditProfile /> },
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
