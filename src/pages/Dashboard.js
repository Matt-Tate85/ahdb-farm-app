// Dashboard.js
import React from 'react';

// Components
import SectorSelector from '../components/common/SectorSelector';
import WeatherWidget from '../components/common/WeatherWidget';
import WelcomeCard from '../components/dashboard/WelcomeCard';
import PriorityActions from '../components/dashboard/PriorityActions';
import FarmerTips from '../components/dashboard/FarmerTips';

/**
 * Dashboard Page
 * The main dashboard of the application, showing an overview of important information
 */
const Dashboard = () => {
  return (
    <div className="space-y-6 p-4">
      <WelcomeCard />
      <SectorSelector />
      <PriorityActions />
      <WeatherWidget location="Yorkshire" />
      <FarmerTips />
    </div>
  );
};

export default Dashboard;