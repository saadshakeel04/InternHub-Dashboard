import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar'; // Assuming Sidebar is in this path
import TopBar from '../components/Topbar.jsx';   // Assuming TopBar is in this path

const MainLayout = () => {
  // State to control the visibility of the sidebar (primarily for mobile)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Sidebar component, passing its open state and a close handler */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      {/* Main content area, takes up remaining space */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* TopBar component, passing a handler to open the sidebar */}
        <TopBar onMenuClick={() => setIsSidebarOpen(true)} />
        
        {/* Main content section, scrolls independently if content overflows */}
        <main className="flex-1 overflow-y-auto p-6 animate-fadeIn">
          {/* Outlet renders the matched child route component */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
