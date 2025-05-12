// src/pages/Dashboard.jsx - Simplified version

import React from 'react';

const Dashboard = () => {
  return (
    <div className="py-4 space-y-4">
      <h2 className="text-lg font-semibold text-gray-700">Dashboard</h2>
      
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-base font-medium mb-3">Welcome to AHDB FarmAssist</h3>
        <p className="text-gray-600">This is the dashboard page. From here you can access all the features of the application.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-base font-medium mb-3">Weather</h3>
          <p className="text-gray-600">Weather information would be displayed here.</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-base font-medium mb-3">Priority Actions</h3>
          <p className="text-gray-600">Priority actions would be displayed here.</p>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-base font-medium mb-3">Recent Updates</h3>
        <p className="text-gray-600">Recent updates would be displayed here.</p>
      </div>
    </div>
  );
};

export default Dashboard;
