// src/App.js - Traditional syntax with Dashboard import

import React from 'react';
import Dashboard from './pages/Dashboard';

function App() {
  // First create the header elements
  const header = React.createElement('h1', { className: 'text-xl font-bold p-4' }, 'AHDB FarmAssist');
  
  // Then create a container and put everything in it
  return React.createElement(
    'div', 
    { className: 'app' },
    React.createElement(
      'div',
      { className: 'container mx-auto px-4' },
      header,
      React.createElement(Dashboard, null)
    )
  );
}

export default App;
