import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the context with a default undefined value
const AuthContext = createContext(undefined);

/**
 * Custom hook to consume the AuthContext.
 * Throws an error if used outside of an AuthProvider.
 * @returns {AuthContextType}
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        // If parsing fails, remove the invalid item from localStorage
        console.error("Failed to parse user data from localStorage:", error);
        localStorage.removeItem('user');
      }
    }
  }, []); // Empty dependency array means this effect runs once on mount

  /**
   * Simulates a user login.
   * @param {string} email - The user's email.
   * @param {string} password - The user's password.
   * @returns {Promise<void>}
   */
  const login = async (email, password) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Random User Data
    const RandUser = {
      id: '1',
      name: 'Saad Shakeel',
      email: email,
      role: 'Full Stack Developer',
      department: 'Development',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
    };

    // Set user state, authentication status, and save to localStorage
    setUser(RandUser);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(RandUser));
  };

  /**
   * Logs out the current user.
   */
  const logout = () => {
    // Removing Data
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  // The value provided to consumers of the AuthContext
  const value = {
    user,
    login,
    logout,
    isAuthenticated
  };
  
  // can be used anywhere in project now
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
