// src/App.js - Removed react-helmet dependency

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Removed react-helmet import
import { SectorProvider } from './contexts/SectorContext';
import { DeviceProvider } from './contexts/DeviceContext';

// Layout components
import Header from './components/layout/Header';
import Navigation from './components/layout/Navigation';
import Footer from './components/layout/Footer';

// Page components - adjusted to match your repo structure
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

const App = () => {
  return (
    <SectorProvider>
      <DeviceProvider>
        <Router>
          {/* Added meta tags directly in public/index.html instead of using react-helmet */}
          <div className="flex flex-col min-h-screen bg-gray-50">
            <Header />
            
            <main className="flex-grow">
              <div className="container mx-auto px-4 sm:px-6 pb-16 md:pb-4 md:pl-64 safe-area-padding">
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
                  {/* For 404 page, use appropriate fallback */}
                  <Route path="*" element={<Dashboard />} />
                </Routes>
              </div>
            </main>
            
            <Navigation />
            <Footer />
          </div>
        </Router>
      </DeviceProvider>
    </SectorProvider>
  );
};

export default App;
