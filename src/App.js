// src/App.js - Using BasicLayout

import React from 'react';
import Dashboard from './pages/Dashboard';
import BasicLayout from './components/layout/BasicLayout';

function App() {
  // Create the Dashboard component
  const dashboardComponent = React.createElement(Dashboard, null);
  
  // Wrap it in the BasicLayout
  return React.createElement(BasicLayout, null, dashboardComponent);
}

export default App;
