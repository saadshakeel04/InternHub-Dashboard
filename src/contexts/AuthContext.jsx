import React, { createContext, useContext, useState, useEffect } from 'react';

// Define the AuthContextType structure using JSDoc
/**
 * @typedef {object} User
 * @property {string} id
 * @property {string} name
 * @property {string} email
 * @property {string} role
 * @property {string} [department]
 * @property {string} [avatar]
 */

/**
 * @typedef {object} AuthContextType
 * @property {User | null} user
 * @property {boolean} isAuthenticated
 * @property {(email: string, password: string) => Promise<void>} login
 * @property {() => void} logout
 * @property {boolean} isLoading - Indicates if the authentication state is being loaded
 */

// Create the AuthContext with an undefined default value
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

/**
 * Props for the AuthProvider component.
 * @typedef {object} AuthProviderProps
 * @property {React.ReactNode} children
 */

/**
 * Provides authentication context to its children.
 * Manages user login/logout state and persists it in localStorage.
 * @param {ThemeProviderProps} { children }
 * @returns {JSX.Element}
 */
export const AuthProvider = ({ children }) => {
  // State to hold the current authenticated user (or null if not authenticated)
  const [user, setUser] = useState(null);
  // State to track if the user is authenticated
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // State to track if the authentication state is currently loading (e.g., from localStorage)
  const [isLoading, setIsLoading] = useState(true); // Initialize as true

  // useEffect to check for persisted authentication state on component mount
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('currentUser'); // Changed key to 'currentUser' for consistency
      if (storedUser) {
        // If a user is found in localStorage, parse it and set the user and authenticated state
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage:", error);
      // Clear any corrupted data if parsing fails
      localStorage.removeItem('currentUser');
    } finally {
      setIsLoading(false); // Authentication state has been loaded, set loading to false
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  /**
   * Simulates a login process. In a real application, this would involve API calls.
   * On successful login, sets the user and persists it to localStorage.
   * @param {string} email - The user's email.
   * @param {string} password - The user's password.
   */
  const login = async (email, password) => {
    setIsLoading(true); // Set loading to true during login process
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock User Data (replace with actual authentication logic)
    const mockUser = {
      id: '1',
      name: 'Saad Shakeel',
      email: email,
      role: 'Full Stack Developer',
      department: 'Development',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
    };

    setUser(mockUser);
    setIsAuthenticated(true);
    localStorage.setItem('currentUser', JSON.stringify(mockUser)); // Persist user data with 'currentUser' key
    setIsLoading(false); // Set loading to false after login
  };

  /**
   * Logs out the current user.
   * Clears the user state and removes user data from localStorage.
   */
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('currentUser'); // Remove user data from persistence with 'currentUser' key
  };

  // Provide the authentication context values to children components
  const value = {
    user,
    login,
    logout,
    isAuthenticated,
    isLoading, // Expose isLoading to consumers
  };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
