# Header.jsx (UK English Version)

import React from 'react';
import { useSector } from '../../contexts/SectorContext';
import { SECTOR_COLOURS } from '../../config/colours';
import { User, Settings, BellRing } from 'lucide-react';

/**
 * Header - Main application header component
 * 
 * @returns {JSX.Element} Rendered header
 */
const Header = () => {
  const { selectedSector } = useSector();
  
  // Derive sector colour for styling
  const sectorColour = SECTOR_COLOURS[selectedSector]?.main || SECTOR_COLOURS.default.main;
  
  return (
    <header className="sticky top-0 z-10 bg-white shadow-sm">
      <div className="flex items-center justify-between px-4 py-2">
        {/* Logo and title */}
        <div className="flex items-center">
          <div 
            className="h-8 w-8 rounded-md mr-2" 
            style={{ backgroundColor: sectorColour }}
          />
          <h1 className="text-lg font-semibold">AHDB FarmAssist</h1>
        </div>
        
        {/* Header actions */}
        <div className="flex items-center space-x-3">
          <button className="text-gray-600 hover:text-gray-900">
            <BellRing size={20} />
          </button>
          <button className="text-gray-600 hover:text-gray-900">
            <Settings size={20} />
          </button>
          <button className="flex items-center text-gray-600 hover:text-gray-900">
            <User size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
