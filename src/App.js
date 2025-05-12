// src/App.js - With react-helmet properly restored

import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
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

// Try to keep this as close to the original working App.js as possible,
// but use HashRouter for better static site compatibility
const App = () => {
  return (
    <>
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <title>AHDB FarmAssist</title>
      </Helmet>
      
      <HashRouter>
        <div className="app">
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
        </div>
      </HashRouter>
    </>
  );
};

export default App;
