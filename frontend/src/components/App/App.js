import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import './App.css';
import Login from '../Login/Login';
import { Outlet } from 'react-router-dom';
import Reciptionists from '../Reciptionists/Reciptionists';
import Sidebar from '../Sidebar/Sidebar';
import Home from '../Home/Home';
import Profile from '../Profile/Profile';
import Patients from '../Patients/Patients';
import Settings from '../Settings/Settings';
import SignOut from '../SignOut/SignOut';

import Navbar from '../Navbar/Navbar';
import NewPatientForm from '../NewPatientForm/NewPatientForm';

const Layout = () => (
  <div className="app">
    <Sidebar />
    <div className="main-content">
      <Outlet />
    </div>
  </div>
);
const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/navbar",
    element: <Navbar />,
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
    path: "/patients",
    element: <Layout />,
    children: [
      { path: "", element: <Patients /> },
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
    path: "/Reciptionists",
    element: (
      <div>
        <Navbar />
        <Reciptionists />
      </div>
    ),
  },
  {
    path: "/new-patient",
    element: (
      <div>
        <Navbar />
        <NewPatientForm />
      </div>
    ),
  },
  {
    path: "/sidebar"

  },

  {
    path: "*",
    element: <Navigate to="/" />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
