import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import './App.css';
import Layout from '../Layout/Layout'; // استيراد الـ Layout الذي يحتوي على الهيدر والسايدبار
import Login from '../Login/Login';
import Reciptionists from '../Reciptionists/Reciptionists';
import Home from '../Home/Home';
import Profile from '../Profile/Profile';
import Settings from '../Settings/Settings';
import SignOut from '../SignOut/SignOut';
import Manegers from '../Manegers/Manegers';
import NewPatientForm from '../NewPatientForm/NewPatientForm';

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  
    {path: '/', element:<Layout />, children:[

      { path: "home", element: <Home /> },
      { path: "profile", element: <Profile /> },
      { path: "manegers", element: <Manegers /> },
      { path: "new-patient", element: <NewPatientForm /> },
      { path: "settings", element: <Settings /> },
      { path: "sign-out", element: <SignOut /> },
      { path: "reciptionists", element: <Reciptionists /> },
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
