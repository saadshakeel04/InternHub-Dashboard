import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Briefcase,
  User,
  X,
} from 'lucide-react';
import logo from '../assets/logo.png';

export default function Sidebar({ isOpen, onClose }) {
  
    const location = useLocation();
  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Candidates', href: '/candidates', icon: Users },
    { name: 'Internships', href: '/internships', icon: Briefcase },
    { name: 'Profile', href: '/profile', icon: User },
  ];

  return (
    <>
      {/*Mobiel View*/}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
<div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:inset-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        

        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center">
            <img src={logo} className='h-10 w-10' ></img>
            <span className="ml-2 text-xl font-bold text-gray-900">InternHub</span>
          </div>
          <button
            className="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            onClick={onClose}
          >
            <X className="h-6 w-6"  />
          </button>
        </div>

        {/* Nav links */}
        <nav className="mt-8 px-4">
          {navigation.map(({ name, href, icon: Icon }) => {
            const active = location.pathname === href;
            return (
              <NavLink
                key={href}
                to={href}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-colors duration-200
                  ${
                    active
                      ? 'bg-indigo-50 text-indigo-700 border-r-2 border-indigo-700'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                onClick={onClose}
              >
                <Icon size={18} className={`mr-3 h-5 w-5,
                    active?'text-indigo-500'
                    : 'text-gray-400'`} />
                {name}
              </NavLink>
            );
          })}
        </nav>
        </div>
    </>
  );
}
