import React from 'react';
import { Navigate } from 'react-router';

const PublicRoute = ({ children }) => {
   // routes that can be accessed without auth token
  const auth = localStorage.getItem('token');
  return !auth ? children : <Navigate to="/" />;
};

export default PublicRoute;