// src/config/colors.js

/**
 * Color configuration for AHDB FarmAssist
 */

// Sector-specific colors
export const SECTOR_COLORS = {
  // Cereals & Oilseeds
  cereals: {
    main: '#F5A623',     // Primary color
    light: '#FEF5E7',    // Light background
    dark: '#D68C1A',     // Dark/hover state
    text: '#8A5D10'      // Text color
  },
  
  // Dairy
  dairy: {
    main: '#27AE60',
    light: '#E9F7EF',
    dark: '#1F8B4C',
    text: '#145A32'
  },
  
  // Beef & Lamb
  beef: {
    main: '#E74C3C',
    light: '#FDEDEC',
    dark: '#C0392B',
    text: '#7B241C'
  },
  
  // Pork
  pork: {
    main: '#9B59B6',
    light: '#F4ECF7',
    dark: '#8E44AD',
    text: '#5B2C6F'
  },
  
  // Default (when no sector is selected)
  default: {
    main: '#0082CA',     // AHDB blue
    light: '#E3F2FD',
    dark: '#01579B',
    text: '#01579B'
  }
};

// AHDB brand colors
export const BRAND_COLORS = {
  green: '#00843D',
  blue: '#0082CA',
  red: '#E4002B',
  orange: '#FF8200'
};

// UI theme colors
export const UI_COLORS = {
  // Primary action colors
  primary: '#0082CA',    // AHDB blue
  
  // Status colors
  success: '#10B981',    // Green
  warning: '#FBBF24',    // Yellow
  danger: '#EF4444',     // Red
  info: '#3B82F6',       // Blue
  
  // Neutral colors
  background: '#F9FAFB',
  cardBackground: '#FFFFFF',
  border: '#E5E7EB',
  text: {
    primary: '#1F2937',
    secondary: '#6B7280',
    muted: '#9CA3AF'
  }
};

// Export a function to get the current theme colors based on sector
export const getThemeColors = (sector) => {
  const sectorColor = SECTOR_COLORS[sector] || SECTOR_COLORS.default;
  
  return {
    ...UI_COLORS,
    primary: sectorColor.main,
    primaryLight: sectorColor.light,
    primaryDark: sectorColor.dark,
    primaryText: sectorColor.text
  };
};
