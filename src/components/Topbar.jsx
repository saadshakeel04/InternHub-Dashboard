import React from 'react';
import { Bell, Menu, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext'; // Assuming this path is correct
import pic from '../assets/user.jpg';

export default function TopBar({ onMenuClick }) {
  // getting user info and for performing logout
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-6 h-16">
        <div className="flex items-center">
          <button
            onClick={onMenuClick} // Calls the func to open/close the sidebar
            className="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
          >
            <Menu className="h-6 w-6" /> 
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100 relative">
            <Bell className="h-6 w-6" /> 
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>

          <div className="flex items-center space-x-3">
            <img
              className="h-8 w-8 rounded-full object-cover"
              src={pic}
              alt={user?.name || 'User Avatar'}
            />
            <div className="hidden md:block">
              <div className="text-sm font-medium text-gray-900">{user?.name}</div>
              <div className="text-xs text-gray-500">{user?.role}</div>
            </div>
          </div>

          {/* Logout btn */}
          <button
            onClick={logout} // Calls the logout function from AuthContext
            className="p-2 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            title="Logout" 
          >
            <LogOut className="h-5 w-5" /> {/* Logout icon */}
          </button>
        </div>
      </div>
    </header>
  );
}
