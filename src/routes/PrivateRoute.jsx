import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getStoredUser } from '../utils/storage';

const PrivateRoute = () => {
    const user = getStoredUser('local');
    return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
