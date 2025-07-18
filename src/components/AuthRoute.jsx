import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Assuming AuthContext is in this path
import { Loader2 } from 'lucide-react'; // Assuming lucide-react is installed

const AuthRoute = ({ children }) => {
  // Destructure isAuthenticated and isLoading from the useAuth hook
  const { isAuthenticated, isLoading } = useAuth();
  
  // If authentication status is still loading, display a loading spinner
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          {/* Loader2 icon from lucide-react, animated to spin */}
          <Loader2 className="h-8 w-8 animate-spin text-indigo-600 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }
  
  // If the user is not authenticated, redirect them to the login page
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  // If authenticated, render the children components (the protected content)
  return <>{children}</>;
};

export default AuthRoute;
