// Events.js
import React from 'react';
import SectorSelector from '../components/common/SectorSelector';
import { useSector } from '../contexts/SectorContext';
import { Camera } from 'lucide-react';

/**
 * Events Page
 * Displays AHDB events and training opportunities
 */
const Events = () => {
  const { selectedSector } = useSector();

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-lg font-semibold text-gray-700">AHDB Events & Training</h2>

      <SectorSelector />

      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="font-medium mb-3">Upcoming Events</h3>

        <div className="space-y-3">
          <div className="pl-3 border-l-4 border-l-green-600 p-2 bg-gray-50 rounded-r-lg">
            <div className="flex justify-between">
              <div className="text-sm font-medium">
                {selectedSector === 'cereals' ? 'Monitor Farm Meeting' :
                 selectedSector === 'dairy' ? 'Strategic Dairy Farm Event' :
                 selectedSector === 'beef' ? 'Better Returns Programme Workshop' : // Programme is already UK spelling
                 'AHDB Pig Health Seminar'}
              </div>
              <div className="text-xs px-2 py-1 rounded-full bg-green-50 text-green-600">
                20 May
              </div>
            </div>
            <div className="text-xs mt-1">
              {selectedSector === 'cereals' ? 'Yorkshire Monitor Farm, Malton' :
               selectedSector === 'dairy' ? 'Mountfair Farm, Cumbria' :
               selectedSector === 'beef' ? 'Askham Bryan College, York' :
               'East of England Showground, Peterborough'}
            </div>
          </div>

          <div className="pl-3 border-l-4 border-l-blue-500 p-2 bg-gray-50 rounded-r-lg">
            <div className="flex justify-between">
              <div className="text-sm font-medium">
                {selectedSector === 'cereals' ? 'Soil Health Workshop' :
                 selectedSector === 'dairy' ? 'Grassland Management Webinar' :
                 selectedSector === 'beef' ? 'Lamb Selection Workshop' :
                 'Reducing Production Costs Forum'}
              </div>
              <div className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-500">
                26 May
              </div>
            </div>
            <div className="text-xs mt-1">
              {selectedSector === 'cereals' ? 'AHDB Stoneleigh Park, Warwickshire' :
               selectedSector === 'dairy' ? 'Online Webinar' :
               selectedSector === 'beef' ? 'Northumberland Livestock Market' :
               'National Exhibition Centre, Birmingham'} // Centre is already UK spelling
            </div>
          </div>
        </div>

        <button className="w-full py-2 rounded-lg bg-blue-500 text-white mt-3">
          View All Events
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="font-medium mb-3">Online Training</h3>

        <div className="space-y-3">
          <div className="flex p-2 border-b">
            <div className="w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center bg-green-50">
              <Camera size={20} className="text-green-600" />
            </div>
            <div className="ml-3 flex-1">
              <div className="text-sm font-medium">
                {selectedSector === 'cereals' ? 'Integrated Pest Management' :
                 selectedSector === 'dairy' ? 'Calf Management' :
                 selectedSector === 'beef' ? 'Beef & Lamb Selection' :
                 'Pig Health & Welfare'}
              </div>
              <div className="text-xs text-gray-500">5 modules | 4-6 hours</div>
            </div>
            <div className="text-xs self-center text-blue-500">
              View
            </div>
          </div>

          <div className="flex p-2 border-b">
            <div className="w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center bg-green-50">
              <Camera size={20} className="text-green-600" />
            </div>
            <div className="ml-3 flex-1">
              <div className="text-sm font-medium">
                {selectedSector === 'cereals' ? 'Crop Nutrient Management' :
                 selectedSector === 'dairy' ? 'Mastitis Control' :
                 selectedSector === 'beef' ? 'Grassland Management' :
                 'Practical Pig Production'}
              </div>
              <div className="text-xs text-gray-500">4-6 modules | 3-5 hours</div>
            </div>
            <div className="text-xs self-center text-blue-500">
              View
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;