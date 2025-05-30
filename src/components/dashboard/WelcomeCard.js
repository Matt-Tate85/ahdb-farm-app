import React from 'react';
import { useSector } from '../../contexts/SectorContext';

/**
 * WelcomeCard Component
 * Displays a welcome message on the dashboard
 */
const WelcomeCard = () => {
  const { selectedSector } = useSector();
  
  return (
    <div className="p-4 rounded-lg border bg-green-50 border-green-600">
      <h2 className="text-lg font-semibold text-green-600">Welcome, James!</h2>
      <p className="text-sm text-green-600">
        AHDB Insights for your {selectedSector === 'cereals' ? 'arable' : selectedSector} farm in Yorkshire:
      </p>
    </div>
  );
};

export default WelcomeCard;
