import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';
import { X } from 'lucide-react';
import { SIDE_MENU_ITEMS, COLORS } from '../../utils/constants';
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
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50">
      <div 
        className="absolute inset-0 bg-black bg-opacity-50" 
        onClick={onClose}
        aria-hidden="true"
      ></div>
      <div className="absolute top-0 left-0 bottom-0 w-64 bg-white shadow-lg">
        <div className="p-4 text-white bg-blue-500 flex justify-between items-center">
          <span className="font-semibold">AHDB Resources</span>
          <button 
            onClick={onClose} 
            className="text-white"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>
        <div className="p-4">
          <div className="mb-6">
            <div className="font-medium text-gray-700">James Wilson</div>
            <div className="text-sm text-gray-700">Mixed Farm - 320 hectares</div>
            <div className="text-sm text-gray-700">Yorkshire, UK</div>
          </div>
          
          <div className="mb-4">
            <h3 className="text-sm font-medium mb-2 text-gray-700">AHDB Sectors</h3>
            <div className="grid grid-cols-2 gap-2">
              <button 
                onClick={() => handleSectorChange('cereals')}
                className={`py-2 px-1 text-xs rounded ${
                  selectedSector === 'cereals' 
                    ? 'bg-orange-500 text-white' 
                    : 'bg-orange-50 text-orange-700'
                }`}
                aria-pressed={selectedSector === 'cereals'}
              >
                Cereals & Oilseeds
              </button>
              <button 
                onClick={() => handleSectorChange('dairy')}
                className={`py-2 px-1 text-xs rounded ${
                  selectedSector === 'dairy' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-blue-50 text-blue-700'
                }`}
                aria-pressed={selectedSector === 'dairy'}
              >
                Dairy
              </button>
              <button 
                onClick={() => handleSectorChange('beef')}
                className={`py-2 px-1 text-xs rounded ${
                  selectedSector === 'beef' 
                    ? 'bg-amber-900 text-white' 
                    : 'bg-amber-50 text-amber-800'
                }`}
                aria-pressed={selectedSector === 'beef'}
              >
                Beef & Lamb
              </button>
              <button 
                onClick={() => handleSectorChange('pork')}
                className={`py-2 px-1 text-xs rounded ${
                  selectedSector === 'pork' 
                    ? 'bg-pink-500 text-white' 
                    : 'bg-pink-50 text-pink-700'
                }`}
                aria-pressed={selectedSector === 'pork'}
              >
                Pork
              </button>
            </div>
          </div>
          
          <ul className="space-y-1">
            {SIDE_MENU_ITEMS.map((item) => {
              const IconComponent = LucideIcons[item.icon];
              return (
                <li 
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  className={`p-2 hover:bg-gray-100 rounded cursor-pointer flex items-center ${item.className || 'text-gray-700'}`}
                >
                  {IconComponent && <IconComponent size={16} className="mr-2" />}
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
