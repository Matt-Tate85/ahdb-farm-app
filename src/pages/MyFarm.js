// MyFarm.js
import React from 'react';
import SectorSelector from '../components/common/SectorSelector';
import { useSector } from '../contexts/SectorContext';

/**
 * MyFarm Page
 * Shows farm data and benchmarking information
 */
const MyFarm = () => {
  const { selectedSector } = useSector();

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-lg font-semibold text-gray-700">My Farm</h2>

      <SectorSelector />

      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="font-medium mb-3">Wilson Family Farm, Yorkshire</h3>

        <div className="h-32 bg-blue-200 rounded-lg flex justify-center items-center mb-4">
          <span className="text-white">Farm map would display here</span>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="p-3 border rounded-lg">
            <div className="text-sm font-medium">Total Area</div>
            <div>320 hectares</div>
          </div>
          <div className="p-3 border rounded-lg">
            <div className="text-sm font-medium">Farm Type</div>
            <div>Mixed Farm</div>
          </div>
          <div className="p-3 border rounded-lg">
            <div className="text-sm font-medium">Main Enterprise</div>
            <div>{selectedSector === 'cereals' ? 'Arable' :
                  selectedSector === 'dairy' ? 'Dairy' :
                  selectedSector === 'beef' ? 'Beef & Sheep' :
                  'Pig Production'}</div>
          </div>
          <div className="p-3 border rounded-lg">
            <div className="text-sm font-medium">Soil Type</div>
            <div>Medium Loam</div>
          </div>
        </div>

        <button className="w-full py-2 rounded-lg bg-blue-500 text-white">
          View Farm Details
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="font-medium mb-3">AHDB Benchmarking</h3>
        <p className="text-sm mb-3">
          Your farm is enrolled in AHDB Farmbench. Your performance is currently:
        </p>

        <div className="p-3 rounded-lg mb-3 bg-green-50">
          <div className="flex justify-between mb-1">
            <span className="text-sm">Production Costs:</span>
            <span className="text-sm font-medium text-green-600">5% below average</span>
          </div>
          <div className="flex justify-between mb-1">
            <span className="text-sm">Yields/Output:</span>
            <span className="text-sm font-medium text-green-600">8% above average</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm">Overall Performance:</span>
            <span className="text-sm font-medium text-green-600">Top 25%</span>
          </div>
        </div>

        <button className="w-full py-2 rounded-lg bg-blue-500 text-white">
          View Benchmarking Report
        </button>
      </div>
    </div>
  );
};

export default MyFarm;