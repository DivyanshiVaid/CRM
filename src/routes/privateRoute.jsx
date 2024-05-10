import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    // routes that can be accessed only when user has the auth token
    const auth = localStorage.getItem('token');
    return auth ? children : <Navigate to="/login" />;
};

export default PrivateRoute;