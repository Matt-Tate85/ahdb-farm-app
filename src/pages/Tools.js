// Tools.js
import React from 'react';
import SectorSelector from '../components/common/SectorSelector';
import { useSector } from '../contexts/SectorContext';
import { FileText } from 'lucide-react';

/**
 * Tools Page
 * Displays AHDB tools and calculators
 */
const Tools = () => {
  const { selectedSector } = useSector();

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-lg font-semibold text-gray-700">AHDB Tools & Calculators</h2>

      <SectorSelector />

      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="font-medium mb-3">Popular Tools</h3>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="p-3 border rounded-lg border-green-600">
            <div className="text-sm font-medium text-green-600">
              {selectedSector === 'cereals' ? 'RB209 Calculator' :
               selectedSector === 'dairy' ? 'Feed Planning' :
               selectedSector === 'beef' ? 'Beef Selection Tool' :
               'Pig Production Calculator'}
            </div>
            <div className="text-xs mt-1">
              {selectedSector === 'cereals' ? 'Calculate fertiliser requirements' :
               selectedSector === 'dairy' ? 'Optimise feed rations' :
               selectedSector === 'beef' ? 'Select animals for market' :
               'Calculate production costs'}
            </div>
          </div>
          <div className="p-3 border rounded-lg border-green-600">
            <div className="text-sm font-medium text-green-600">
              {/* Conditional display for AHDB Farmbench or Recommended List */}
              {selectedSector === 'cereals' ? 'Recommended List' : 'AHDB Farmbench'}
              </div>
            <div className="text-xs mt-1">
              {/* Conditional description based on the displayed tool */}
              {selectedSector === 'cereals' ? 'View recommended crop varieties' : 'Benchmark your farm performance'}
              </div>
          </div>
          <div className="p-3 border rounded-lg border-green-600">
            <div className="text-sm font-medium text-green-600">
              {selectedSector === 'cereals' ? 'Spray Planning' :
               selectedSector === 'dairy' ? 'Milk Price Calculator' :
               selectedSector === 'beef' ? 'Grazing Planner' :
               'Finisher Tool'}
            </div>
            <div className="text-xs mt-1">
              {selectedSector === 'cereals' ? 'Plan spray applications' :
               selectedSector === 'dairy' ? 'Compare milk contracts' :
               selectedSector === 'beef' ? 'Optimise grazing rotation' :
               'Track finishing performance'}
            </div>
          </div>
          <div className="p-3 border rounded-lg border-green-600">
            <div className="text-sm font-medium text-green-600">Gross Margin Calculator</div>
            <div className="text-xs mt-1">Calculate enterprise gross margins</div>
          </div>
        </div>

        <button className="w-full py-2 rounded-lg bg-blue-500 text-white">
          View All AHDB Tools
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="font-medium mb-3">Latest Publications</h3>

        <div className="space-y-3">
          <div className="flex p-2 border-b">
            <div className="w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center bg-green-50">
              <FileText size={20} className="text-green-600" />
            </div>
            <div className="ml-3">
              <div className="text-sm font-medium">
                {selectedSector === 'cereals' ? 'Wheat Growth Guide' :
                 selectedSector === 'dairy' ? 'Forage for Knowledge' :
                 selectedSector === 'beef' ? 'Better Returns Programme' :
                 'Pig Health & Performance'}
              </div>
              <div className="text-xs text-gray-500">Updated: May 2025</div>
            </div>
          </div>

          <div className="flex p-2 border-b">
            <div className="w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center bg-green-50">
              <FileText size={20} className="text-green-600" />
            </div>
            <div className="ml-3">
              <div className="text-sm font-medium">
                {selectedSector === 'cereals' ? 'Recommended Lists 2025/26' :
                 selectedSector === 'dairy' ? 'Mastitis Control Plan' :
                 selectedSector === 'beef' ? 'Beef & Lamb Selection' :
                 'Practical Pig Guide'}
              </div>
              <div className="text-xs text-gray-500">Updated: April 2025</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tools;
