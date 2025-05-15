import React from 'react';
import { AlertTriangle, ChevronRight } from 'lucide-react';
import { useSector } from '../../contexts/SectorContext';

/**
 * PriorityActions Component
 * Displays sector-specific priority actions on the dashboard
 */
const PriorityActions = () => {
  const { selectedSector } = useSector();

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="font-medium mb-2 flex items-center">
        <AlertTriangle size={18} className="mr-2 text-orange-500" />
        Priority Actions
      </h3>
      <ul className="space-y-2">
        {selectedSector === 'cereals' && (
          <>
            <li className="flex items-center text-sm p-2 rounded border-l-4 bg-orange-50 border-l-orange-500">
              <ChevronRight size={16} className="mr-2 text-orange-500" />
              Apply T2 fungicide to winter wheat in Long Field (GS37-39)
            </li>
            <li className="flex items-center text-sm p-2 rounded border-l-4 bg-blue-50 border-l-blue-500">
              <ChevronRight size={16} className="mr-2 text-blue-500" />
              Check OSR for pollen beetle - threshold may be reached
            </li>
          </>
        )}
        {selectedSector === 'dairy' && (
          <>
            <li className="flex items-center text-sm p-2 rounded border-l-4 bg-orange-50 border-l-orange-500">
              <ChevronRight size={16} className="mr-2 text-orange-500" />
              Optimal silage cutting date approaching (D-value 72-74)
            </li>
            <li className="flex items-center text-sm p-2 rounded border-l-4 bg-blue-50 border-l-blue-500">
              <ChevronRight size={16} className="mr-2 text-blue-500" />
              Review milk contract terms - AHDB voluntary code
            </li>
          </>
        )}
        {selectedSector === 'beef' && (
          <>
            <li className="flex items-center text-sm p-2 rounded border-l-4 bg-orange-50 border-l-orange-500">
              <ChevronRight size={16} className="mr-2 text-orange-500" />
              Time to implement rotational grazing plan
            </li>
            <li className="flex items-center text-sm p-2 rounded border-l-4 bg-blue-50 border-l-blue-500">
              <ChevronRight size={16} className="mr-2 text-blue-500" />
              Check finished cattle against target specification
            </li>
          </>
        )}
        {selectedSector === 'pork' && (
          <>
            <li className="flex items-center text-sm p-2 rounded border-l-4 bg-orange-50 border-l-orange-500">
              <ChevronRight size={16} className="mr-2 text-orange-500" />
              Review ventilation settings ahead of temperature changes
            </li>
            <li className="flex items-center text-sm p-2 rounded border-l-4 bg-blue-50 border-l-blue-500">
              <ChevronRight size={16} className="mr-2 text-blue-500" />
              Check AHDB cost of production calculator
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default PriorityActions;
