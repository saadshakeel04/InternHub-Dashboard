import React, { useState } from 'react';
import { Bell, Menu, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext'; 
import pic from '../assets/user.jpg'; 
import { notifications } from '../data/notifications'; // Import mock notifications

export default function TopBar({ onMenuClick }) {

  // getting user info and for performing logout
  const { user, logout } = useAuth();

  // State to control the visibility of the notifications dropdown
  const [showNotifications, setShowNotifications] = useState(false);

  const getRandomNotifications = () => {
    // Shuffle the array to get random 3 notifications
    const shuffled = [...notifications].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  };

  // Get random notifications each time the component renders or state updates
  const currentNotifications = getRandomNotifications();

  const handleBellClick = () => {
    setShowNotifications(prev => !prev); // Toggle notification dropdown visibility
  };

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
          <div className="relative">
            <button 
              onClick={handleBellClick} // Use the new handler for bell click
              className="p-2 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100 relative transition-all duration-200 hover:scale-105"
            >
              <Bell className="h-6 w-6" /> 
              {currentNotifications.some(notif => !notif.read) && (
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
              )}
            </button>

            {/* Notifications */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                <div className="px-4 py-2 text-sm font-medium text-gray-800 border-b border-gray-200">
                  Notifications
                </div>
                {currentNotifications.length > 0 ? (
                  currentNotifications.map(notification => (
                    <div 
                      key={notification.id} 
                      className="px-4 py-3 border-b border-gray-100 last:border-b-0 text-gray-900" // Changed to always be text-gray-900
                    >
                      <p className="text-sm">{notification.message}</p>
                      <p className="text-xs text-gray-400 mt-1">{new Date(notification.date).toLocaleDateString()}</p>
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-3 text-sm text-gray-500">No new notifications.</div>
                )}
                <div className="px-4 py-2 text-center border-t border-gray-200">
                  <button className="text-sm text-indigo-600 hover:text-indigo-800">View All</button>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-3">
            <img
              className="h-8 w-8 rounded-full object-cover ring-2 ring-transparent hover:ring-indigo-500 transition-all duration-200"
              src={pic}
              alt={user?.name || 'User'}
            />
            <div className="hidden md:block">
              <div className="text-sm font-medium text-gray-900">{user?.name}</div>
              <div className="text-xs text-gray-500">{user?.role}</div>
            </div>
          </div>

          {/* Logout btn */}
          <button
            onClick={logout} // Calls the logout function from AuthContext
            className="p-2 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all duration-200 hover:scale-105"
            title="Logout" 
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
