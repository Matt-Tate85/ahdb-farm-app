import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';
import { X } from 'lucide-react';
import { SIDE_MENU_ITEMS, COLORS, SECTOR_COLORS } from '../../utils/constants'; // Import COLORS and SECTOR_COLORS
import { useSector } from '../../contexts/SectorContext';

/**
 * SideMenu Component
 * Side navigation drawer for accessing additional features
 *
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Whether the side menu is open
 * @param {Function} props.onClose - Function to close the side menu
 */
const SideMenu = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { selectedSector, setSelectedSector } = useSector();

  if (!isOpen) return null;

  const handleItemClick = (item) => {
    if (item.id === 'logout') {
      // Handle logout - in a real app, this would clear auth state
      // For now, we'll just navigate to the login screen
      console.log('Logging out...');
      // navigate('/login');
    } else {
      navigate(`/${item.id}`);
    }
    onClose();
  };

  const handleSectorChange = (sector) => {
    setSelectedSector(sector);
    // Optionally navigate to a default page for the new sector if needed
    // navigate('/');
    onClose();
  };

   // Helper function to get styles for sector buttons (replicated from SectorSelector)
  const getSectorButtonStyles = (sectorId) => {
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
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
        aria-hidden="true"
      ></div>
      <div className="absolute top-0 left-0 bottom-0 w-64 bg-white shadow-lg">
        {/* Side Menu Header */}
        <div
          className="p-4 flex justify-between items-center" // Removed text-white and bg-blue-500
          style={{
            backgroundColor: COLORS.ahdbBlue, // Set background to ahdbBlue
            color: COLORS.credible, // Set text color to credible
          }}
        >
          <span className="font-semibold">AHDB Resources</span>
          <button
            onClick={onClose}
            className="" // Removed text-white, color is set by parent header style
            aria-label="Close menu"
            style={{ color: COLORS.white}} // Explicitly set button color
          >
            <X size={24} />
          </button>
        </div>

        {/* Side Menu Content */}
        <div className="p-4">
          {/* User Info Section */}
          <div className="mb-6">
            {/* These text colors are currently hardcoded or using default gray.
                You might want to link these to COLORS.ahdbText or COLORS.credible
                depending on desired contrast on white background.
                For now, keeping original classes or letting them inherit default body text.
            */}
            <div className="font-medium text-gray-700">James Wilson</div>
            <div className="text-sm text-gray-700">Mixed Farm - 320 hectares</div>
            <div className="text-sm text-gray-700">Yorkshire, UK</div>
          </div>

          {/* Main Navigation Items */}
          <ul className="space-y-1">
            {SIDE_MENU_ITEMS.map((item) => {
              const IconComponent = LucideIcons[item.icon];
              // Apply credible color unless item has a specific class (like logout)
              const itemColor = item.className ? undefined : COLORS.credible;
              const itemStyle = itemColor ? { color: itemColor } : {};

              return (
                <li
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  className={`p-2 hover:bg-gray-100 rounded cursor-pointer flex items-center ${item.className || ''}`} // Removed default text-gray-700
                  style={itemStyle} // Apply credible color style
                >
                  {IconComponent && <IconComponent size={16} className="mr-2" style={itemColor ? { color: itemColor } : {}} />} {/* Apply credible color to icon too */}
                  {item.label}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
