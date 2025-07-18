import React from 'react';
import { Bell, Menu, LogOut, Moon, Sun } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext'; // Assuming AuthContext is in this path
import { useTheme } from '../contexts/ThemeContext'; // Assuming ThemeContext is in this path

// Define the TopBarProps structure using JSDoc
/**
 * @typedef {object} TopBarProps
 * @property {() => void} onMenuClick - Function to handle menu button click.
 */

/**
 * TopBar component for the application dashboard.
 * Displays user information, theme toggle, notifications, and a menu button for mobile.
 * @param {TopBarProps} { onMenuClick }
 * @returns {JSX.Element}
 */
const TopBar = ({ onMenuClick }) => {
  // Destructure user and logout from the useAuth hook
  const { user, logout } = useAuth();
  // Destructure isDark and toggleTheme from the useTheme hook
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors duration-200">
      <div className="flex items-center justify-between px-6 h-16">
        <div className="flex items-center">
          {/* Menu button for mobile view */}
          <button
            onClick={onMenuClick}
            className="md:hidden p-2 rounded-md text-gray-400 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            <Menu className="h-6 w-6" />
          </button>
          
          {/* Dashboard title */}
          <div className="ml-4 md:ml-0">
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white transition-colors duration-200">Dashboard</h1>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Theme toggle button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-gray-400 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-105"
          >
            {/* Renders Sun icon if dark mode is active, otherwise Moon icon */}
            {isDark ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>
          
          {/* Notifications button with a red dot indicator */}
          <button className="p-2 rounded-full text-gray-400 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 relative transition-all duration-200 hover:scale-105">
            <Bell className="h-6 w-6" />
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>
          
          {/* User avatar and details */}
          <div className="flex items-center space-x-3">
            <img
              className="h-8 w-8 rounded-full object-cover ring-2 ring-transparent hover:ring-indigo-500 transition-all duration-200"
              // Uses user's avatar if available, otherwise a placeholder image
              src={user?.avatar || 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'}
              alt={user?.name || 'User avatar'} // Alt text for accessibility
            />
            <div className="hidden md:block">
              <div className="text-sm font-medium text-gray-900 dark:text-white transition-colors duration-200">{user?.name}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 transition-colors duration-200">{user?.role}</div>
            </div>
          </div>
          
          {/* Logout button */}
          <button
            onClick={logout}
            className="p-2 rounded-full text-gray-400 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 hover:scale-105"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
