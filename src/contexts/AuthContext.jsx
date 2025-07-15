import React, { createContext, useContext, useState, useEffect } from 'react';
const AuthContext = createContext(undefined);

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
    if (SavedUser) {
      setUser(JSON.parse(SavedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email, password) => {

    await new Promise(resolve => setTimeout(resolve, 1000));
    // Random User Data
    const RandUser = {
      id: '1',
      name: 'John Doe',
      email: email,
      role: 'HR Manager',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
    };

    setUser(RandUser);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(RandUser));
  };

  const logout = () => {
    //Removind Data
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated
  };
  
//can be used anywhere in project now
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
