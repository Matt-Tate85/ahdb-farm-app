import React from 'react';
import { Menu, HelpCircle } from 'lucide-react';

/**
 * Header Component
 * The top navigation bar of the application
 * 
 * @param {Object} props - Component props
 * @param {Function} props.toggleSideMenu - Function to toggle the side menu
 */
const Header = ({ toggleSideMenu }) => {
  return (
    <header className="text-white p-4 flex justify-between items-center bg-blue-500">
      <div className="flex items-center space-x-2">
        <button 
          onClick={toggleSideMenu} 
          className="text-white"
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>
        <h1 className="text-lg font-semibold">AHDB FarmAssist</h1>
      </div>
      <button 
        className="text-white"
        aria-label="Help"
      >
        <HelpCircle size={24} />
      </button>
    </header>
  );
};

export default Header;
