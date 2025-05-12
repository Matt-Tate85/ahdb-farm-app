// src/contexts/SectorContext.jsx

import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the sector context
const SectorContext = createContext(null);

/**
 * Provider component for sector selection
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 */
export const SectorProvider = ({ children }) => {
  // Get stored sector from localStorage or default to 'cereals'
  const [selectedSector, setSelectedSector] = useState(() => {
    const storedSector = localStorage.getItem('ahdb_selected_sector');
    return storedSector || 'cereals';
  });
  
  // Update localStorage when sector changes
  useEffect(() => {
    localStorage.setItem('ahdb_selected_sector', selectedSector);
  }, [selectedSector]);
  
  return (
    <SectorContext.Provider value={{ selectedSector, setSelectedSector }}>
      {children}
    </SectorContext.Provider>
  );
};

/**
 * Hook to access sector context
 * @returns {Object} Sector context value
 */
export const useSector = () => {
  const context = useContext(SectorContext);
  
  if (context === null) {
    throw new Error('useSector must be used within a SectorProvider');
  }
  
  return context;
};
