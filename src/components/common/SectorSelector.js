// src/components/common/SectorSelector.jsx

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { useSector } from '../../contexts/SectorContext';
import { useDevice } from '../../contexts/DeviceContext';
import { SECTOR_COLORS } from '../../config/colors';

const SectorSelector = () => {
  const { selectedSector, setSelectedSector } = useSector();
  const { isMobile } = useDevice();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  const sectors = [
    { id: 'cereals', name: 'Cereals & Oilseeds' },
    { id: 'dairy', name: 'Dairy' },
    { id: 'beef', name: 'Beef & Lamb' },
    { id: 'pork', name: 'Pork' }
  ];
  
  const handleSectorChange = (sectorId) => {
    setSelectedSector(sectorId);
    setIsOpen(false);
  };
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const currentSector = sectors.find(s => s.id === selectedSector) || sectors[0];
  
  return (
    <div ref={dropdownRef} className="relative w-full md:w-64">
      {/* Selected sector button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[44px]"
        style={{ borderColor: SECTOR_COLORS[selectedSector]?.main }}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <div className="flex items-center">
          <div 
            className="w-3 h-3 rounded-full mr-2" 
            style={{ backgroundColor: SECTOR_COLORS[selectedSector]?.main }} 
          />
          <span className="text-sm md:text-base">{currentSector.name}</span>
        </div>
        <ChevronDown size={18} />
      </button>
      
      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
          <ul className="py-1" role="menu">
            {sectors.map((sector) => (
              <li key={sector.id} role="menuitem">
                <button
                  onClick={() => handleSectorChange(sector.id)}
                  className="flex items-center w-full px-4 py-3 text-left hover:bg-gray-50 min-h-[44px]"
                >
                  <div 
                    className="w-3 h-3 rounded-full mr-2" 
                    style={{ backgroundColor: SECTOR_COLORS[sector.id]?.main }} 
                  />
                  <span className="text-sm md:text-base">{sector.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SectorSelector;
