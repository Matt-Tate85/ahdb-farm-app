// src/components/dashboard/PriorityActions.jsx

import React from 'react';
import { Clock, AlertTriangle, CheckCircle } from 'lucide-react';
import { useSector } from '../../contexts/SectorContext';
import { useDevice } from '../../contexts/DeviceContext';
import { SECTOR_COLORS } from '../../config/colors';

const PriorityActions = () => {
  const { selectedSector } = useSector();
  const { isMobile } = useDevice();
  const sectorColor = SECTOR_COLORS[selectedSector]?.main || SECTOR_COLORS.default.main;
  
  // Sector-specific actions
  const actions = {
    cereals: [
      { title: 'Apply fungicide', dueDate: '2 days', urgent: true, type: 'action' },
      { title: 'Schedule spring nitrogen application', dueDate: '7 days', urgent: false, type: 'action' },
      { title: 'Weekly crop inspection due', dueDate: 'Today', urgent: false, type: 'reminder' }
    ],
    dairy: [
      { title: 'Mastitis check for Cow #127', dueDate: 'Today', urgent: true, type: 'action' },
      { title: 'Order feed supplement', dueDate: '3 days', urgent: false, type: 'action' },
      { title: 'Milk quality report available', dueDate: 'New', urgent: false, type: 'alert' }
    ],
    beef: [
      { title: 'Move cattle to field 7', dueDate: 'Today', urgent: true, type: 'action' },
      { title: 'Schedule vet visit', dueDate: '5 days', urgent: false, type: 'action' },
      { title: 'Weight recording due', dueDate: '2 days', urgent: false, type: 'reminder' }
    ],
    pork: [
      { title: 'Pen cleaning schedule', dueDate: 'Today', urgent: true, type: 'action' },
      { title: 'Feed stock running low', dueDate: '3 days', urgent: true, type: 'alert' },
      { title: 'Check water supply', dueDate: '1 day', urgent: false, type: 'action' }
    ]
  };
  
  // Get actions for selected sector
  const sectorActions = actions[selectedSector] || actions.cereals;
  
  // Icon mapping
  const getIcon = (type, urgent) => {
    switch (type) {
      case 'action':
        return <Clock size={16} className={urgent ? "text-red-500" : "text-blue-500"} />;
      case 'alert':
        return <AlertTriangle size={16} className="text-amber-500" />;
      case 'reminder':
        return <CheckCircle size={16} className="text-green-500" />;
      default:
        return <Clock size={16} className="text-blue-500" />;
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="text-base font-medium mb-3">Priority Actions</h3>
      
      <div className="space-y-3">
        {sectorActions.map((action, index) => (
          <div 
            key={index}
            className={`border rounded-md p-3 flex items-center ${
              action.urgent ? 'border-red-200 bg-red-50' : 'border-gray-200'
            }`}
          >
            <div className="mr-3 flex-shrink-0">
              {getIcon(action.type, action.urgent)}
            </div>
            <div className="flex-grow">
              <p className="text-sm font-medium">{action.title}</p>
              <p className="text-xs text-gray-500">Due: {action.dueDate}</p>
            </div>
            <button
              className="ml-2 text-xs px-3 py-1.5 rounded-md text-white min-h-[36px]"
              style={{ backgroundColor: sectorColor }}
            >
              {isMobile ? 'View' : 'View Details'}
            </button>
          </div>
        ))}
      </div>
      
      <div className="mt-3 pt-2 border-t border-gray-100">
        <button className="text-sm text-blue-500 hover:text-blue-600">
          View all tasks
        </button>
      </div>
    </div>
  );
};

export default PriorityActions;
