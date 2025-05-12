// src/contexts/DeviceContext.jsx

import React, { createContext, useContext } from 'react';
import useDeviceDetection from '../hooks/useDeviceDetection';

// Create context
const DeviceContext = createContext(null);

/**
 * Provider component for device detection
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 */
export const DeviceProvider = ({ children }) => {
  const deviceInfo = useDeviceDetection();
  
  return (
    <DeviceContext.Provider value={deviceInfo}>
      {children}
    </DeviceContext.Provider>
  );
};

/**
 * Hook to access device information
 * @returns {Object} Device information
 */
export const useDevice = () => {
  const context = useContext(DeviceContext);
  
  if (context === null) {
    throw new Error('useDevice must be used within a DeviceProvider');
  }
  
  return context;
};
