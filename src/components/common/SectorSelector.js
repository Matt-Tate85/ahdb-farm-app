import React from 'react';
import { useSector } from '../../contexts/SectorContext';

/**
 * SectorSelector Component
 * Allows users to switch between different agricultural sectors
 */
const SectorSelector = () => {
  const { selectedSector, setSelectedSector } = useSector();

  return (
    <div className="bg-green-50 rounded-lg p-3 mb-4 border-l-4 border-l-green-600">
      <div className="text-sm font-semibold text-green-600 mb-2">
        Current AHDB Sector
      </div>
      <div className="flex flex-wrap gap-2">
        <button 
          className={`rounded-lg px-3 py-2 text-xs font-medium flex-grow border max-w-[calc(50%-0.25rem)] ${
            selectedSector === 'cereals' 
              ? 'bg-orange-500 text-white border-orange-500 font-semibold' 
              : 'bg-white text-orange-700 border-neutral-300 font-medium'
          }`}
          onClick={() => setSelectedSector('cereals')}
        >
          Cereals & Oilseeds
        </button>
        <button 
          className={`rounded-lg px-3 py-2 text-xs font-medium flex-grow border max-w-[calc(50%-0.25rem)] ${
            selectedSector === 'dairy' 
              ? 'bg-blue-500 text-white border-blue-500 font-semibold' 
              : 'bg-white text-blue-700 border-neutral-300 font-medium'
          }`}
          onClick={() => setSelectedSector('dairy')}
        >
          Dairy
        </button>
        <button 
          className={`rounded-lg px-3 py-2 text-xs font-medium flex-grow border max-w-[calc(50%-0.25rem)] ${
            selectedSector === 'beef' 
              ? 'bg-amber-900 text-white border-amber-900 font-semibold' 
              : 'bg-white text-amber-800 border-neutral-300 font-medium'
          }`}
          onClick={() => setSelectedSector('beef')}
        >
          Beef & Lamb
        </button>
        <button 
          className={`rounded-lg px-3 py-2 text-xs font-medium flex-grow border max-w-[calc(50%-0.25rem)] ${
            selectedSector === 'pork' 
              ? 'bg-pink-500 text-white border-pink-500 font-semibold' 
              : 'bg-white text-pink-700 border-neutral-300 font-medium'
          }`}
          onClick={() => setSelectedSector('pork')}
        >
          Pork
        </button>
      </div>
    </div>
  );
};

export default SectorSelector;
