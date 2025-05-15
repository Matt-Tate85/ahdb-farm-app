// SectorSelector.js
import React from 'react';
import { useSector } from '../../contexts/SectorContext';
import { SECTOR_COLORS, COLORS } from '../../utils/constants'; // Import SECTOR_COLORS and COLORS

/**
 * SectorSelector Component
 * Allows users to switch between different agricultural sectors
 */
const SectorSelector = () => {
  const { selectedSector, setSelectedSector } = useSector();

  // Helper function to get styles based on sector and selection state
  const getButtonStyles = (sectorId) => {
    const isSelected = selectedSector === sectorId;
    const colors = SECTOR_COLORS[sectorId];

    if (!colors) {
        // Fallback or default styles if colors are not defined for a sector
        return isSelected
            ? { backgroundColor: '#000', color: '#fff', borderColor: '#000' } // Default selected
            : { backgroundColor: '#fff', color: '#000', borderColor: '#d1d5db' }; // Default unselected
    }

    return isSelected
      ? { backgroundColor: colors.main, color: '#fff', borderColor: colors.main }
      : { backgroundColor: colors.light, color: colors.text, borderColor: '#d1d5db' }; // Using light and text colors for unselected state
  };

  return (
    <div
      className="rounded-lg p-3 mb-4 border-l-4" // Removed bg-green-50 and border-l-green-600
      style={{
        backgroundColor: COLORS.,ahdbBlue // Set background to credible
        borderLeftColor: COLORS.credible, // Set left border color to ahdbBlue
      }}
    >
      <div
        className="text-sm font-semibold mb-2" // Removed text-green-600
        style={{ color: COLORS.white }} // Set text color to ahdbBlue
      >
        Current AHDB Sector
      </div>
      <div className="flex flex-wrap gap-2">
        <button
          className={`rounded-lg px-3 py-2 text-xs font-medium flex-grow border max-w-[calc(50%-0.25rem)] ${selectedSector === 'cereals' ? 'font-semibold' : 'font-medium'}`}
          style={getButtonStyles('cereals')} // Apply dynamic styles
          onClick={() => setSelectedSector('cereals')}
        >
          Cereals & Oilseeds
        </button>
        <button
          className={`rounded-lg px-3 py-2 text-xs font-medium flex-grow border max-w-[calc(50%-0.25rem)] ${selectedSector === 'dairy' ? 'font-semibold' : 'font-medium'}`}
           style={getButtonStyles('dairy')} // Apply dynamic styles
          onClick={() => setSelectedSector('dairy')}
        >
          Dairy
        </button>
        <button
          className={`rounded-lg px-3 py-2 text-xs font-medium flex-grow border max-w-[calc(50%-0.25rem)] ${selectedSector === 'beef' ? 'font-semibold' : 'font-medium'}`}
           style={getButtonStyles('beef')} // Apply dynamic styles
          onClick={() => setSelectedSector('beef')}
        >
          Beef & Lamb
        </button>
        <button
          className={`rounded-lg px-3 py-2 text-xs font-medium flex-grow border max-w-[calc(50%-0.25rem)] ${selectedSector === 'pork' ? 'font-semibold' : 'font-medium'}`}
           style={getButtonStyles('pork')} // Apply dynamic styles
          onClick={() => setSelectedSector('pork')}
        >
          Pork
        </button>
      </div>
    </div>
  );
};

export default SectorSelector;
