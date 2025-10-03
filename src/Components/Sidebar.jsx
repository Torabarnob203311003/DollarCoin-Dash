import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import logo from '../assets/Footer.svg'; // Adjust path if needed

const Sidebar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    // Add your logout logic here
    navigate('/login');
  };

  return (
    <aside className="sidebar bg-gray-800 text-white min-h-max w-64 flex flex-col p-4">
      
      {/* <div className="flex items-center space-x-2">
            <img src={logo} alt="Dollar Coin Logo" className="h-8 w-8" />
            <span className="text-lg font-bold text-white">Dollar Coin</span>
          </div> */}
      <nav className="flex flex-col space-y-2">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `flex items-center p-3 rounded-lg transition ${isActive ? 'bg-green-700/50 font-semibold' : 'hover:bg-gray-700'}`
          }
        >
          <FaIcons.FaHome className="mr-3" /> Overview
        </NavLink>
        <NavLink
          to="/dashboard/users"
          className={({ isActive }) =>
            `flex items-center p-3 rounded-lg transition ${isActive ? 'bg-green-700/50 font-semibold' : 'hover:bg-gray-700'}`
          }
        >
          <FaIcons.FaUsers className="mr-3" /> User Management
        </NavLink>
      </nav>
      <div className="mt-auto flex flex-col">
        <button
          onClick={handleLogout}
          className="flex items-center p-3 rounded-lg transition bg-red-700/80 hover:bg-red-800 text-white font-semibold mb-4"
        >
          <FaIcons.FaSignOutAlt className="mr-3" /> Logout
        </button>
        <div className="pt-4 text-xs text-gray-400">© 2024 DollarCoin</div>
      </div>
    </aside>
  );
};

export default Sidebar;
