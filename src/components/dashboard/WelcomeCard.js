// WelcomeCard.js
import React from 'react';
import { useSector } from '../../contexts/SectorContext';
import { SECTOR_COLORS } from '../../utils/constants'; // Import SECTOR_COLORS

/**
 * WelcomeCard Component
 * Displays a welcome message on the dashboard
 */
const WelcomeCard = () => {
  const { selectedSector } = useSector();

  // Get the colours for the selected sector
  const sectorColors = SECTOR_COLORS[selectedSector];

  // Define default colours if sectorColors are not found (optional fallback)
  const defaultColors = {
    main: '#6da32f', // AHDB Green
    light: '#e6f4fc', // A light background, could be adjusted
    text: '#575756' // AHDB Text
  };

  // Use sector-specific colours if available, otherwise use defaults
  const cardBackgroundColor = sectorColors?.main || defaultColors.main;
  const cardBorderColor = sectorColors?.main || defaultColors.main;
  const cardTextColor = '#fff'; // Changed to always be white
  const headingTextColor = sectorColors?.text || defaultColors.text; // Use main color for heading


  return (
    <div
      className="p-4 rounded-lg border"
      style={{
        backgroundColor: cardBackgroundColor,
        borderColor: cardBorderColor,
        color: cardTextColor // Apply text color to the container
      }}
    >
      <h2
        className="text-lg font-semibold"
        style={{ color: headingTextColor }} // Apply heading color specifically
      >
        Welcome, James!
      </h2>
      <p className="text-sm">
        AHDB Insights for your {selectedSector === 'cereals' ? 'arable' : selectedSector} farm in Yorkshire:
      </p>
    </div>
  );
};

export default WelcomeCard;
