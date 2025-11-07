import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const AdminRoute = () => {
  const { authData } = useContext(AuthContext);

  if (!authData.isLoggedIn || authData.role !== 'ADMIN') {
    return <Navigate to="/admin-login" replace />;
  }

  return <Outlet />; 
};

export default AdminRoute;
