import React from 'react';
import { Menu, HelpCircle } from 'lucide-react';
import { COLORS } from '../../utils/constants'; // Import COLORS from constants

/**
 * Header Component
 * The top navigation bar of the application
 *
 * @param {Object} props - Component props
 * @param {Function} props.toggleSideMenu - Function to toggle the side menu
 */
const Header = ({ toggleSideMenu }) => {
  return (
    <header
      className="p-4 flex justify-between items-center" // Removed text-white and bg-blue-500
      style={{
        backgroundColor: COLORS.ahdbBlue, // Set background to ahdbBlue from constants
        color: COLORS.credible, // Set text color to credible from constants
      }}
    >
      <div className="flex items-center space-x-2">
        <button
          onClick={toggleSideMenu}
          className="" // Removed text-white, color is set by parent header style
          aria-label="Open menu"
          style={{ color: COLORS.credible }} // Explicitly set button color for clarity/override if needed
        >
          <Menu size={24} />
        </button>
        <h1 className="text-lg font-semibold">AHDB FarmAssist</h1> {/* Text color inherited from header style */}
      </div>
      <button
        className="" // Removed text-white, color is set by parent header style
        aria-label="Help"
        style={{ color: COLORS.credible }} // Explicitly set button color for clarity/override if needed
      >
        <HelpCircle size={24} />
      </button>
    </header>
  );
};

export default Header;
