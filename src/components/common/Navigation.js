import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';
import { MAIN_TABS, COLORS } from '../../utils/constants';

/**
 * Navigation Component
 * Bottom navigation bar for main application tabs
 */
const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname === '/' ? '/home' : location.pathname;
  
  return (
    <nav className="bg-white border-t border-gray-200 overflow-x-auto">
      <div className="flex">
        {MAIN_TABS.map(tab => {
          const IconComponent = LucideIcons[tab.icon];
          const isActive = pathname === `/${tab.id}` || 
                          (tab.id === 'home' && pathname === '/');
          
          return (
            <button
              key={tab.id}
              className="flex flex-col items-center py-2 px-2 min-w-16"
              style={{
                color: isActive ? COLORS.ahdbBlue : COLORS.ahdbText
              }}
              onClick={() => navigate(`/${tab.id === 'home' ? '' : tab.id}`)}
              aria-label={tab.label}
              aria-current={isActive ? 'page' : undefined}
            >
              <IconComponent size={20} />
              <span className="text-xs mt-1">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;
