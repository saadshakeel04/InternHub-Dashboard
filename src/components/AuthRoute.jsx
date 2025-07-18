import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; 
import { Loader2 } from 'lucide-react'; 

const AuthRoute = ({ children }) => {
  // separate isAuthenticated and isLoading from the useAuth hook
  const { isAuthenticated, isLoading } = useAuth();
  
  // loading spinner meanwhile the authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-indigo-600 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }
  
  // If the user not authenticated, redirect them to the login page
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  // If authenticated, render the children components
  return <>{children}</>;
};

export default AuthRoute;
