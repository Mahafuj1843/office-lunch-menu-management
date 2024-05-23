import React from 'react'
import { Navigate } from "react-router-dom";
import { ErrorToast } from '../helpers/formHelper';

const ProtectedRoute = ({ children, path }) => {
    if (localStorage.getItem("token"))
        return children;
    
    ErrorToast("Please login first");
    localStorage.setItem("intendedRoute", path);
    return <Navigate to="/login" />;
}

export default ProtectedRoute