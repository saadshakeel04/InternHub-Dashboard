import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  CircleGauge,
  Users,
  Briefcase,
  User,
  X,
  LogOut,
} from 'lucide-react';
import logo from '../assets/logo.png';
import pic from '../assets/user.jpg';
import { useAuth } from '../contexts/AuthContext'; 
import Button from '../components/Button'; 

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation();
  const { user, logout } = useAuth(); // Destructure user and logout from useAuth

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: CircleGauge },
    { name: 'Candidates', href: '/candidates', icon: Users },
    { name: 'Internships', href: '/internships', icon: Briefcase },
    { name: 'Profile', href: '/profile', icon: User },
  ];

  return (
    <>
      {/* Small screens (mobile) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-white-700 bg-opacity-70 backdrop-blur-md z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <div className={`fixed inset-y-0 left-0 z-50 w-72 bg-gray-800 text-white shadow-xl transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:inset-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        
        <div className="flex items-center justify-between h-18 px-6 border-b border-gray-700">
          <div className="flex items-center">
            <img src={logo} className='h-15 w-15' alt="InternHub Logo" />
            <span className="ml-3 text-2xl font-extrabold text-white">InternHub</span>
          </div>
          <button
            className="md:hidden p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700"
            onClick={onClose}
          >
            <X className="h-7 w-7" />
          </button>
        </div>

        <div className="flex items-center px-6 py-8 border-b border-gray-700">
          <img
            className="h-14 w-14 rounded-full object-cover ring-2 ring-indigo-500"
            src={pic}
            alt={user?.name || 'User'}
          />
          <div className="ml-4">
            <div className="text-lg font-semibold text-white">{user?.name}</div>
            <div className="text-sm text-gray-400">{user?.role}</div>
          </div>
        </div>

        <nav className="mt-6 px-4">
          {navigation.map(({ name, href, icon: Icon }) => {
            const active = location.pathname === href;
            return (
              <NavLink
                key={href}
                to={href}
                className={`flex items-center px-5 py-3 text-base font-medium rounded-lg transition-colors duration-200 hover:scale-[1.02]
                  ${
                    active
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                onClick={onClose}
              >
                <Icon size={22} className={`mr-4 ${active ? 'text-white' : 'text-gray-400'}`} />
                {name}
              </NavLink>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 w-full px-6 py-4 border-t border-gray-700">
            <Button variant='sidebar'
                onClick={logout}
                className="flex items-center w-full px-5 py-3 text-base font-medium rounded-lg"
                title="Logout"
            >
                <LogOut size={22} className="mr-4" />
                Logout
            </Button>
        </div>
      </div>
    </>
  );
}