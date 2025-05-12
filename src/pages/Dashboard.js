// src/pages/Dashboard.js - Using traditional syntax

import React from 'react';

const Dashboard = () => {
  return React.createElement(
    'div',
    { className: 'p-4' },
    React.createElement('h2', { className: 'text-lg font-semibold' }, 'Dashboard'),
    React.createElement('p', null, 'This is the Dashboard component using traditional React syntax.')
  );
};

export default Dashboard;
