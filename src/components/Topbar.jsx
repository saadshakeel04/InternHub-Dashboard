import React, { useState } from 'react';
import { Bell, Menu, LogOut, Instagram, Linkedin, Github } from 'lucide-react'; 
import { useAuth } from '../contexts/AuthContext'; 
import { notifications } from '../data/notifications'; 

export default function TopBar({ onMenuClick }) {
  const [showNotifications, setShowNotifications] = useState(false);

  const getRandomNotifications = () => {
    const shuffled = [...notifications].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  };

  const currentNotifications = getRandomNotifications();

  const handleBellClick = () => {
    setShowNotifications(prev => !prev); 
  };

  return (
    <header className="bg-gray-800 bg-opacity-75 shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-6 h-18"> 

        <div className="flex items-center space-x-6"> 
          <button
            onClick={onMenuClick}
            className="md:hidden p-3 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-all duration-200" // Larger padding
          >
            <Menu className="h-7 w-7" /> 
          </button> 

          <div className="flex items-center space-x-6 text-gray-500"> {/* Larger space-x, hidden on small screens */}
            <a href="https://www.instagram.com/malik.saad04/" target="_blank" rel="noopener noreferrer" className="hover:text-pink-600 transition-colors duration-200">
              <Instagram className="h-7 w-7" /> 
            </a>
            <a href="https://www.linkedin.com/in/saad-shakeel-419063259/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-700 transition-colors duration-200">
              <Linkedin className="h-7 w-7" /> 
            </a>
            <a href="https://github.com/saadshakeel04" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 transition-colors duration-200">
              <Github className="h-7 w-7" /> 
            </a>
          </div>
        </div>

        <div className="flex items-center space-x-6"> 
          <div className="relative">
            <button 
              onClick={handleBellClick}
              className="p-3 text-gray-500 hover:text-gray-600 relative transition-all duration-200"
            >
              <Bell className="h-7 w-7 cursor-pointer" />
                <span className="absolute top-1 right-1 h-2.5 w-2.5 bg-red-500 rounded-full border-2 border-white"></span> 
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-3 w-80 bg-white rounded-lg shadow-xl py-2 z-50 border border-gray-200 animate-fade-in-down"> {/* Removed backdrop-blur for crispness */}
                <div className="px-4 py-3 text-base font-medium text-gray-800 border-b border-gray-200"> {/* Increased font size */}
                  Notifications
                </div>
                {currentNotifications.length > 0 ? (
                  currentNotifications.map(notification => (
                    <div 
                      key={notification.id} 
                      className="px-4 py-3 border-b border-gray-100 last:border-b-0 text-gray-900 hover:bg-gray-50 transition-colors duration-150 cursor-pointer" // Added hover
                    >
                      <p className="text-sm">{notification.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{new Date(notification.date).toLocaleDateString()}</p> {/* Changed date color for clarity */}
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-3 text-sm text-gray-500">No new notifications.</div>
                )}
                <div className="px-4 py-2 text-center border-t border-gray-200">
                  <button className="text-sm text-indigo-600 hover:text-indigo-800 font-semibold">View All</button> {/* Added font-semibold */}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}