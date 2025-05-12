// src/components/layout/Navigation.jsx

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Leaf, BarChart2, Calendar, BookOpen, Menu } from 'lucide-react';
import { useSector } from '../../contexts/SectorContext';
import { useDevice } from '../../contexts/DeviceContext';
import { SECTOR_COLORS } from '../../config/colors';

const Navigation = () => {
  const location = useLocation();
  const { selectedSector } = useSector();
  const { isMobile, isTablet } = useDevice();
  const sectorColor = SECTOR_COLORS[selectedSector]?.main || SECTOR_COLORS.default.main;
  
  // Determine active route
  const isActive = (path) => location.pathname === path;
  
  // Use mobile navigation for mobile and tablet devices
  const useMobileNav = isMobile || isTablet;
  
  return (
    <>
      {/* Mobile Bottom Navigation */}
      {useMobileNav && (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-2 z-10 safe-area-padding">
          <NavItem 
            to="/" 
            icon={<Home size={24} />} 
            label="Home" 
            active={isActive('/')} 
            color={sectorColor} 
          />
          <NavItem 
            to="/field-check" 
            icon={<Leaf size={24} />} 
            label="Field" 
            active={isActive('/field-check')} 
            color={sectorColor} 
          />
          <NavItem 
            to="/market" 
            icon={<BarChart2 size={24} />} 
            label="Market" 
            active={isActive('/market')} 
            color={sectorColor} 
          />
          <NavItem 
            to="/events" 
            icon={<Calendar size={24} />} 
            label="Events" 
            active={isActive('/events')} 
            color={sectorColor} 
          />
          <NavItem 
            to="/library" 
            icon={<BookOpen size={24} />} 
            label="Library" 
            active={isActive('/library')} 
            color={sectorColor} 
          />
        </nav>
      )}
      
      {/* Desktop Side Navigation */}
      {!useMobileNav && (
        <nav className="flex flex-col w-64 h-screen fixed left-0 top-0 bg-white border-r border-gray-200 p-4">
          <div className="mb-8">
            <img 
              src="/assets/ahdb-logo.png" 
              alt="AHDB Logo" 
              className="h-10"
            />
          </div>
          
          <div className="flex flex-col space-y-2">
            <SideNavItem 
              to="/" 
              icon={<Home size={20} />} 
              label="Dashboard" 
              active={isActive('/')} 
              color={sectorColor} 
            />
            <SideNavItem 
              to="/field-check" 
              icon={<Leaf size={20} />} 
              label="Field Check" 
              active={isActive('/field-check')} 
              color={sectorColor} 
            />
            <SideNavItem 
              to="/market" 
              icon={<BarChart2 size={20} />} 
              label="Market Data" 
              active={isActive('/market')} 
              color={sectorColor} 
            />
            <SideNavItem 
              to="/events" 
              icon={<Calendar size={20} />} 
              label="Events Calendar" 
              active={isActive('/events')} 
              color={sectorColor} 
            />
            <SideNavItem 
              to="/library" 
              icon={<BookOpen size={20} />} 
              label="Knowledge Library" 
              active={isActive('/library')} 
              color={sectorColor} 
            />
          </div>
        </nav>
      )}
    </>
  );
};

// Mobile Navigation Item
const NavItem = ({ to, icon, label, active, color }) => (
  <Link 
    to={to} 
    className={`flex flex-col items-center justify-center w-16 h-full ${active ? 'text-blue-600' : 'text-gray-500'}`}
    style={{ color: active ? color : undefined }}
  >
    <div className="w-6 h-6 flex items-center justify-center">
      {icon}
    </div>
    <span className="text-xs mt-1">{label}</span>
  </Link>
);

// Desktop Side Navigation Item
const SideNavItem = ({ to, icon, label, active, color }) => (
  <Link 
    to={to} 
    className={`flex items-center px-4 py-3 rounded-lg ${active ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
    style={{ color: active ? color : undefined }}
  >
    <span className="mr-3">{icon}</span>
    <span className={`${active ? 'font-medium' : ''}`}>{label}</span>
  </Link>
);

export default Navigation;
