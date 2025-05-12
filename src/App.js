// src/App.js - Using traditional JavaScript syntax

import React from 'react';

function App() {
  return React.createElement(
    'div', 
    { style: { padding: '20px' } },
    React.createElement('h1', null, 'AHDB FarmAssist'),
    React.createElement('p', null, 'Testing with createElement')
  );
}

export default App;
