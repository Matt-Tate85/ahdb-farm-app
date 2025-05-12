// src/App.js - Original working version

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import page components
import Dashboard from './pages/Dashboard';
import FieldCheck from './pages/FieldCheck';
import Market from './pages/Market';
import Events from './pages/Events';
import Library from './pages/Library';
import Tools from './pages/Tools';
import Settings from './pages/Settings';
import MyFarm from './pages/MyFarm';
import Farmbench from './pages/Farmbench';
import KnowledgeLibrary from './pages/KnowledgeLibrary';
import ResearchProjects from './pages/ResearchProjects';
import MonitorFarm from './pages/MonitorFarm';

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/field-check" element={<FieldCheck />} />
          <Route path="/market" element={<Market />} />
          <Route path="/events" element={<Events />} />
          <Route path="/library" element={<Library />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/my-farm" element={<MyFarm />} />
          <Route path="/farmbench" element={<Farmbench />} />
          <Route path="/knowledge-library" element={<KnowledgeLibrary />} />
          <Route path="/research-projects" element={<ResearchProjects />} />
          <Route path="/monitor-farm" element={<MonitorFarm />} />
          <Route path="*" element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
