import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the AuthContext with an undefined default value
const AuthContext = createContext(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthRoute');
  }
  return context;
};


export const AuthProvider = ({ children }) => {

  // State to hold the current authenticated user, null if not authenticated
  const [user, setUser] = useState(null);

  // State to track if the user is authenticated
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // State to track if the authentication state is currently loading 
  const [isLoading, setIsLoading] = useState(true); // Initialize as true

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('currentUser'); // 
      if (storedUser) {
        // If a user is found in localStorage, parse it and set the user and authenticated state
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      }
    }
     catch (error) {
      console.error("Failed to parse user from localStorage:", error);
      // Clear any data if fails
      localStorage.removeItem('currentUser');
    } 
    finally {
      setIsLoading(false); // Auth state loaded
    }
  }, []); //runs only once on mount


  const login = async (email, password) => {
    setIsLoading(true); // Set loading to true during login process
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser = {
      id: '1',
      name: 'Saad Shakeel',
      email: email,
      role: 'Full Stack Developer',
      department: 'Development',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
    };

    setUser(randUser);
    setIsAuthenticated(true);
    localStorage.setItem('currentUser', JSON.stringify(randUser)); // Persist user data with 'currentUser' key
    setIsLoading(false); // Set loading to false after login
  };


  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('currentUser'); // Remove user data-current user
  };

  // Provide the authentication context values to children components
  const value = {
    user,
    login,
    logout,
    isAuthenticated,
    isLoading, 
  };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
