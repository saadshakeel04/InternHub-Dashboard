import React from 'react';
import { Navigate } from 'react-router-dom'; 
import { useAuth } from '../contexts/AuthContext.jsx'; 


const AuthRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // If not authenticated, redirect to the login page
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render the children.(single element)
  return <>{children}</>;
};

export default AuthRoute;