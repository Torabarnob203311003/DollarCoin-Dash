import React from 'react';
import logo from '../assets/Footer.svg'; // Use the same logo as in Sidebar

const Header = () => (
  <header className="header flex items-center justify-between px-6 py-4 bg-gray-800 border-b border-green-700/30">
    <div className="flex items-center space-x-2">
      <img src={logo} alt="Dollar Coin Logo" className="h-8 w-8" />
      <span className="text-lg font-bold text-white">Dollar Coin</span>
    </div>
    <div className="flex items-center">
      <div className="w-10 h-10 bg-green-700 rounded-full border-2 border-green-500 flex items-center justify-center cursor-pointer hover:opacity-80 transition">
        <span className="text-sm font-bold">JD</span>
      </div>
    </div>
  </header>
);

export default Header;
