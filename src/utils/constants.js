// constants.js
// AHDB brand colours
export const COLORS = { // Translate colours
  ahdbBlue: "#0090d4",
  ahdbGreen: "#6da32f",
  ahdbText: "#575756",
  credible: "#1f4350",
  neutral: "#dfd5b4",
  balance: "#9db7c2",
  solid: "#7b3010",
  confident: "#ed7013"
};

// Sector-specific colours
export const SECTOR_COLORS = { // Translate colours
  cereals: {
    main: COLORS.confident,
    light: "#fdf0e6",
    text: "#b65610"
  },
  dairy: {
    main: COLORS.ahdbBlue,
    light: "#e6f4fc",
    text: "#0078b0"
  },
  beef: {
    main: COLORS.solid,
    light: "#f9ede7",
    text: "#632710"
  },
  pork: {
    main: "#d4619d", // Created this since there was no pink in the palette
    light: "#faedf5",
    text: "#b04e81"
  }
};

// Navigation tabs configuration
export const MAIN_TABS = [
  { id: 'home', label: 'Dashboard', icon: 'Home' },
  { id: 'field-check', label: 'Field Check', icon: 'Camera' },
  { id: 'advice', label: 'Advice', icon: 'MessageCircle' },
  { id: 'market', label: 'Markets', icon: 'BarChart2' },
  { id: 'my-farm', label: 'My Farm', icon: 'Map' },
  { id: 'tools', label: 'Tools', icon: 'Briefcase' },
  { id: 'events', label: 'Events', icon: 'Calendar' },
  { id: 'library', label: 'Library', icon: 'FileText' }
];

// Side menu navigation items
export const SIDE_MENU_ITEMS = [
  { id: 'home', label: 'Dashboard', icon: 'Home' },
  { id: 'field-check', label: 'Field Check', icon: 'Camera' },
  { id: 'advice', label: 'Advice', icon: 'MessageCircle' },
  { id: 'market', label: 'Markets', icon: 'BarChart2' },
  { id: 'my-farm', label: 'My Farm', icon: 'Map' },
  { id: 'tools', label: 'Tools', icon: 'Briefcase' },
  { id: 'events', label: 'Events', icon: 'Calendar' },
  { id: 'library', label: 'Library', icon: 'FileText' },
  { id: 'farm-record', label: 'My Farm Record', icon: 'ClipboardList' },
  { id: 'farmbench', label: 'AHDB Farmbench', icon: 'TrendingUp' },
  { id: 'knowledge-library', label: 'AHDB Knowledge Library', icon: 'BookOpen' },
  { id: 'research-projects', label: 'Research Projects', icon: 'FolderSearch' },
  { id: 'monitor-farm', label: 'Local Monitor Farm', icon: 'MapPin' },
  { id: 'events-near-me', label: 'Events Near Me', icon: 'Calendar' },
  { id: 'settings', label: 'Settings', icon: 'Settings' },
  { id: 'logout', label: 'Logout', icon: 'LogOut', className: 'text-ahdb-solid' }
];

// Sample weather data
export const SAMPLE_WEATHER_FORECAST = [
  { day: 'Today', temp: '14°C', icon: 'Cloud', rain: '30%', wind: '15 mph' },
  { day: 'Tomorrow', temp: '12°C', icon: 'Droplets', rain: '80%', wind: '20 mph' },
  { day: 'Wednesday', temp: '11°C', icon: 'Wind', rain: '25%', wind: '25 mph' },
  { day: 'Thursday', temp: '15°C', icon: 'Sun', rain: '5%', wind: '10 mph' },
];

// Sample farmer tips
export const SAMPLE_FARMER_TIPS = [
  'Winter Wheat: T2 fungicide timing approaching',
  'Market Alert: Oilseed rape prices strengthening',
  'AHDB Event: Beef & Lamb farm walk in Yorkshire next Tuesday',
  'New Resource: Updated RB209 section now available on AHDB website'
];
