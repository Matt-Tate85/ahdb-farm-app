# SectorSelector.jsx (UK English Version)

import React from 'react';
import { useSector } from '../../contexts/SectorContext';
import { SECTOR_COLOURS } from '../../config/colours';

/**
 * SectorSelector - Component for selecting the agricultural sector
 * 
 * Allows users to switch between different farming sectors,
 * which affects content, recommendations, and colour schemes.
 * 
 * @returns {JSX.Element} Rendered sector selector
 */
const SectorSelector = () => {
  const { selectedSector, setSector } = useSector();
  
  // Available sectors with display names
  const sectors = [
    { id: 'cereals', name: 'Cereals & Oilseeds' },
    { id: 'dairy', name: 'Dairy' },
    { id: 'beef', name: 'Beef & Lamb' },
    { id: 'pork', name: 'Pork' }
  ];
  
  return (
    <div className="flex flex-wrap gap-2 my-4">
      {sectors.map(sector => (
        <button
          key={sector.id}
          onClick={() => setSector(sector.id)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedSector === sector.id 
              ? 'text-white' 
              : 'text-gray-700 border border-gray-300 hover:bg-gray-50'
          }`}
          style={{ 
            backgroundColor: selectedSector === sector.id 
              ? SECTOR_COLOURS[sector.id].main 
              : 'transparent' 
          }}
        >
          {sector.name}
        </button>
      ))}
    </div>
  );
};

export default SectorSelector;
