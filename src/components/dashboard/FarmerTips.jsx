// src/components/dashboard/FarmerTips.jsx

import React from 'react';
import { BookOpen, ChevronRight } from 'lucide-react';
import { useSector } from '../../contexts/SectorContext';
import { useDevice } from '../../contexts/DeviceContext';
import { SECTOR_COLORS } from '../../config/colors';

const FarmerTips = () => {
  const { selectedSector } = useSector();
  const { isMobile } = useDevice();
  const sectorColor = SECTOR_COLORS[selectedSector]?.main || SECTOR_COLORS.default.main;
  
  // Sector-specific tips
  const tips = {
    cereals: [
      { title: 'Optimizing spray timing for wheat fungicides', date: '2 days ago' },
      { title: 'Latest research on resistant weed management', date: '1 week ago' },
      { title: 'Market outlook: Cereal prices set to rise', date: '2 weeks ago' }
    ],
    dairy: [
      { title: 'Maximizing milk production during hot weather', date: '3 days ago' },
      { title: 'New feeding strategies to reduce methane', date: '1 week ago' },
      { title: 'Dairy market update: Prices stabilizing', date: '2 weeks ago' }
    ],
    beef: [
      { title: 'Improving cattle growth rates through pasture management', date: '2 days ago' },
      { title: 'Health protocols for newly purchased cattle', date: '1 week ago' },
      { title: 'Beef market outlook: Strong demand continues', date: '2 weeks ago' }
    ],
    pork: [
      { title: 'Reducing feed costs while maintaining quality', date: '2 days ago' },
      { title: 'Best practices for hot weather management', date: '1 week ago' },
      { title: 'Export markets expanding for UK pork', date: '2 weeks ago' }
    ]
  };
  
  // Get tips for selected sector
  const sectorTips = tips[selectedSector] || tips.cereals;
  
  // Limit the number of tips on mobile
  const displayTips = isMobile ? sectorTips.slice(0, 2) : sectorTips;
  
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="text-base font-medium mb-3">Recent Tips & News</h3>
      
      <div className="space-y-3">
        {displayTips.map((tip, index) => (
          <div 
            key={index}
            className="border border-gray-200 rounded-md p-3"
          >
            <div className="flex items-start">
              <BookOpen size={16} className="flex-shrink-0 mt-0.5 mr-2 text-gray-500" />
              <div>
                <p className="text-sm font-medium">{tip.title}</p>
                <p className="text-xs text-gray-500 mt-1">{tip.date}</p>
              </div>
            </div>
            <div className="mt-2 flex justify-end">
              <button className="text-xs text-blue-500 flex items-center">
                Read more <ChevronRight size={14} className="ml-1" />
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-3 pt-2 border-t border-gray-100">
        <button 
          className="text-sm px-3 py-1.5 rounded-md text-white w-full min-h-[36px]" 
          style={{ backgroundColor: sectorColor }}
        >
          View all articles
        </button>
      </div>
    </div>
  );
};

export default FarmerTips;
