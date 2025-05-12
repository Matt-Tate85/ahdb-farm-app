// src/components/layout/Header.jsx

import React, { useState } from 'react';
import { Menu, Bell, User, Search, X } from 'lucide-react';
import { useSector } from '../../contexts/SectorContext';
import { useDevice } from '../../contexts/DeviceContext';
import { SECTOR_COLORS } from '../../config/colors';

const Header = () => {
  const { selectedSector } = useSector();
  const { isMobile, isTablet, isDesktop, safeAreaInsets } = useDevice();
  const [searchActive, setSearchActive] = useState(false);
  
  const sectorColor = SECTOR_COLORS[selectedSector]?.main || SECTOR_COLORS.default.main;
  
  // Mobile and tablet use simplified header
  const isSimplifiedHeader = isMobile || isTablet;
  
  return (
    <header 
      className={`bg-white border-b border-gray-200 ${isSimplifiedHeader ? 'py-3' : 'py-4'} safe-area-padding`}
      style={{ 
        paddingTop: `${Math.max(16, safeAreaInsets.top)}px` 
      }}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo or Menu button */}
        <div className="flex items-center">
          {isSimplifiedHeader ? (
            <button className="mr-3">
              <Menu size={24} />
            </button>
          ) : null}
          
          <img 
            src="/assets/ahdb-logo.png" 
            alt="AHDB Logo" 
            className={isSimplifiedHeader ? "h-8" : "h-10"}
          />
        </div>
        
        {/* Search bar (desktop always shown, mobile/tablet toggled) */}
        {(!isSimplifiedHeader || searchActive) && (
          <div className={`${isSimplifiedHeader ? 'absolute inset-x-0 top-0 bg-white p-3 z-20 flex items-center safe-area-padding' : 'relative flex-grow mx-8 max-w-md'}`}>
            {isSimplifiedHeader && (
              <button 
                onClick={() => setSearchActive(false)}
                className="mr-3"
              >
                <X size={24} />
              </button>
            )}
            
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search tools, markets, guides..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        )}
        
        {/* Action buttons */}
        <div className="flex items-center">
          {isSimplifiedHeader && !searchActive && (
            <button 
              onClick={() => setSearchActive(true)}
              className="mr-4"
            >
              <Search size={24} />
            </button>
          )}
          
          <button className="relative mr-4">
            <Bell size={isSimplifiedHeader ? 24 : 20} />
            <span 
              className="absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center bg-red-500 text-white text-xs rounded-full"
            >
              3
            </span>
          </button>
          
          <button 
            className={`flex items-center justify-center rounded-full overflow-hidden ${isSimplifiedHeader ? 'w-8 h-8' : 'w-8 h-8'}`} 
            style={{ backgroundColor: sectorColor }}
          >
            <User size={isSimplifiedHeader ? 20 : 16} className="text-white" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
