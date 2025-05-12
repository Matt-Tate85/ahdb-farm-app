// src/pages/Dashboard.jsx

import React from 'react';
import SectorSelector from '../components/common/SectorSelector';
import WeatherWidget from '../components/dashboard/WeatherWidget';
import PriorityActions from '../components/dashboard/PriorityActions';
import FarmerTips from '../components/dashboard/FarmerTips';
import { useSector } from '../contexts/SectorContext';
import { useDevice } from '../contexts/DeviceContext';

const Dashboard = () => {
  const { selectedSector } = useSector();
  const { isMobile, isTablet } = useDevice();
  
  return (
    <div className="py-4 space-y-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h2 className="text-lg font-semibold text-gray-700 mb-2 md:mb-0">
          Dashboard
        </h2>
        <SectorSelector />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <WeatherWidget />
        <PriorityActions />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-4 lg:col-span-2">
          <h3 className="text-base font-medium mb-3">My Farm Overview</h3>
          {/* Farm overview content */}
          <div className="h-48 bg-gray-100 rounded flex items-center justify-center">
            <span className="text-gray-500">Farm map and data visualization</span>
          </div>
        </div>
        
        <FarmerTips />
      </div>
    </div>
  );
};

export default Dashboard;
