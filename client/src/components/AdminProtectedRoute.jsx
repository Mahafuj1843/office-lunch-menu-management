import React from 'react'
import { Navigate } from "react-router-dom";
import { ErrorToast } from '../helpers/formHelper';

const AdminProtectedRoute = ({ children }) => {
    if (!localStorage.getItem("token")) {
        ErrorToast("Please login first");
        return <Navigate to="/login" />;
    }
    
    if (JSON.parse(localStorage.getItem("UserDetails")).role === "ADMIN")
        return children;

    return <Navigate to="/" />;
}

export default AdminProtectedRoute