// src/App.js - Direct component render without routing

import React from 'react';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <div className="app">
      <div className="container mx-auto px-4">
        <h1 className="text-xl font-bold p-4">AHDB FarmAssist</h1>
        <Dashboard />
      </div>
    </div>
  );
}

export default App;
