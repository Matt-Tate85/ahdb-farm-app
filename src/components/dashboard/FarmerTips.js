// FarmerTips.js
import React from 'react';
import { useSector } from '../../contexts/SectorContext'; // Import useSector
import { SAMPLE_FARMER_TIPS } from '../../utils/constants'; // Keep existing import

/**
 * FarmerTips Component
 * Displays farming tips and updates on the dashboard
 */
const FarmerTips = () => {
  const { selectedSector } = useSector(); // Get selected sector

  // --- Simulated Sector-Specific Tips ---
  // In a real app, these would likely come from an API or more complex logic
  const sectorSpecificTips = {
    cereals: [
      'Winter Wheat: T2 fungicide timing approaching',
      'Check for early signs of yellow rust in susceptible varieties.',
      'Consider soil moisture levels before spring fertiliser application.'
    ],
    dairy: [
      'Optimal time for first silage cut approaching – monitor grass D-value.',
      'Review transition cow management protocols ahead of calving.',
      'Explore AHDB resources on improving forage utilisation.'
    ],
    beef: [
      'Time to implement rotational grazing plan for optimal grass use.',
      'Check finished cattle against target specification for market readiness.',
      'Review AHDB Beef & Lamb selection resources.'
    ],
    pork: [
      'Review ventilation settings ahead of temperature changes in indoor units.',
      'Check AHDB cost of production calculator for latest benchmarks.',
      'Explore the latest research on reducing antibiotic usage.'
    ]
  };

  // Get the tips for the currently selected sector, fall back to generic if none exist
  const currentTips = sectorSpecificTips[selectedSector] || SAMPLE_FARMER_TIPS;


  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="font-medium mb-2">AHDB Updates & Resources</h3>
      <ul className="space-y-2">
        {currentTips.map((tip, i) => ( // Use currentTips
          <li key={i} className="text-sm border-b border-gray-100 pb-2 last:border-0 last:pb-0">
            {tip}
          </li>
        ))}
        <li className="text-sm font-medium mt-2 text-green-600">
          View more in AHDB Knowledge Library →
        </li>
      </ul>
    </div>
  );
};

export default FarmerTips;
