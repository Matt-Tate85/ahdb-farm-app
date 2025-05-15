// FarmRecord.js
import React from 'react';
import SectorSelector from '../components/common/SectorSelector';
import { useSector } from '../contexts/SectorContext';
import { ClipboardList, Edit, BarChart2, Database } from 'lucide-react';

/**
 * FarmRecord Page
 * Detailed farm records and management tools
 */
const FarmRecord = () => {
  const { selectedSector } = useSector();

  const fieldRecords = [
    { name: 'Long Field', area: '24.5 ha', crop: selectedSector === 'cereals' ? 'Winter Wheat' : 'Grass' },
    { name: 'Home Paddock', area: '18.2 ha', crop: selectedSector === 'cereals' ? 'Oilseed Rape' : 'Grass/Clover' },
    { name: 'River Meadow', area: '32.6 ha', crop: selectedSector === 'cereals' ? 'Spring Barley' : 'Permanent Pasture' },
    { name: 'Hill Top', area: '15.8 ha', crop: selectedSector === 'cereals' ? 'Winter Barley' : 'Silage' }
  ];

  const recentActivities = [
    { date: '10 May 2025', activity: 'Fertiliser Application', field: 'Long Field', details: 'N: 180kg/ha, P: 30kg/ha' }, // Translate here
    { date: '05 May 2025', activity: 'Pest Monitoring', field: 'Home Paddock', details: 'Pollen beetle counts below threshold' },
    { date: '02 May 2025', activity: 'Soil Testing', field: 'River Meadow', details: 'pH: 6.8, P: 2, K: 2+' }
  ];

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-700">My Farm Record</h2>
        <button className="text-sm text-blue-500 flex items-center">
          <Edit size={16} className="mr-1" />
          Edit Farm Details
        </button>
      </div>

      <SectorSelector />

      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium flex items-center">
            <Database size={18} className="mr-2 text-blue-500" />
            Farm Overview
          </h3>
        </div>

        <div className="h-40 bg-blue-200 rounded-lg flex justify-center items-center mb-4">
          <span className="text-white">Farm map would display here</span>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="border rounded-lg p-3">
            <div className="text-sm font-medium">Total Area</div>
            <div className="text-lg">320 hectares</div>
          </div>
          <div className="border rounded-lg p-3">
            <div className="text-sm font-medium">Location</div>
            <div className="text-lg">Yorkshire, UK</div>
          </div>
          <div className="border rounded-lg p-3">
            <div className="text-sm font-medium">Soil Types</div>
            <div className="text-lg">Medium Loam</div>
          </div>
          <div className="border rounded-lg p-3">
            <div className="text-sm font-medium">Main Enterprises</div>
            <div className="text-lg">
              {selectedSector === 'cereals' ? 'Arable' :
               selectedSector === 'dairy' ? 'Dairy' :
               selectedSector === 'beef' ? 'Beef & Sheep' :
               'Pig Production'}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium flex items-center">
            <ClipboardList size={18} className="mr-2 text-green-600" />
            Field Records
          </h3>
          <button className="text-xs text-green-600">
            Add Field
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Field Name</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Area</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Current Crop</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {fieldRecords.map((field, i) => (
                <tr key={i}>
                  <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-700">{field.name}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{field.area}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{field.crop}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-blue-500">View Details</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium flex items-center">
            <BarChart2 size={18} className="mr-2 text-orange-500" />
            Recent Activities
          </h3>
          <button className="text-xs text-green-600">
            Record Activity
          </button>
        </div>

        <div className="space-y-3">
          {recentActivities.map((activity, i) => (
            <div key={i} className="p-3 border rounded-lg">
              <div className="flex justify-between">
                <span className="text-sm font-medium">{activity.activity}</span>
                <span className="text-xs text-gray-500">{activity.date}</span>
              </div>
              <div className="text-xs mt-1">
                <span className="font-medium">Field:</span> {activity.field}
              </div>
              <div className="text-xs mt-1">
                <span className="font-medium">Details:</span> {activity.details}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FarmRecord;