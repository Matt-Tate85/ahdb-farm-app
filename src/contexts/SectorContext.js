import React, { createContext, useState, useContext, useEffect } from 'react';

// Create a context for managing the selected sector
const SectorContext = createContext();

// Custom hook to use the sector context
export const useSector = () => {
  const context = useContext(SectorContext);
  if (!context) {
    throw new Error('useSector must be used within a SectorProvider');
  }
  return context;
};

// Provider component to wrap the app and provide sector context
export const SectorProvider = ({ children }) => {
  // Initialize the selected sector, checking localStorage first
  const [selectedSector, setSelectedSector] = useState(() => {
    const storedSector = localStorage.getItem('selectedSector');
    return storedSector || 'cereals';
  });

  // Update localStorage when sector changes
  useEffect(() => {
    localStorage.setItem('selectedSector', selectedSector);
  }, [selectedSector]);

  // Value to be provided by the context
  const contextValue = {
    selectedSector,
    setSelectedSector,
  };

  return (
    <SectorContext.Provider value={contextValue}>
      {children}
    </SectorContext.Provider>
  );
};

export default SectorContext;
