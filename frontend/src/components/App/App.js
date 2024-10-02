import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import './App.css';
import Layout from '../Layout/Layout';
import Login from '../Login/Login';
import Reciptionists from '../Reciptionists/Reciptionists';
import Home from '../Home/Home';
import Profile from '../Profile/Profile';
import Department from '../Department/Department';
import Settings from '../Settings/Settings';
import SignOut from '../SignOut/SignOut';
import Manegers from '../Manegers/Manegers';
import NewPatientForm from '../NewPatientForm/NewPatientForm';

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/home",
    element: <Layout />,
    children: [
      { path: "", element: <Home /> },
    ],
  },
  {
    path: "/profile",
    element: <Layout />,
    children: [
      { path: "", element: <Profile /> },
    ],
  },
  {
    path: "/manegers",
    element: <Layout />,
    children: [
      { path: "", element: <Manegers /> },
    ],
  },
  {
    path: "/Department",
    element: <Layout />,
    children: [
      { path: "", element: <Department /> },
    ],
  },
  {
    path: "/new-patient",
    element: <Layout />,
    children: [
      { path: "", element: <NewPatientForm /> },
    ],
  },
  {
    path: "/settings",
    element: <Layout />,
    children: [
      { path: "", element: <Settings /> },
    ],
  },
  {
    path: "/sign-out",
    element: <Layout />,
    children: [
      { path: "", element: <SignOut /> },
    ],
  },
  {
    path: "/reciptionists",
    element: <Layout />,
    children: [
      { path: "", element: <Reciptionists /> },
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
