import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

// Common component
import Header from './components/common/Header';
import Navigation from './components/common/Navigation';
import SideMenu from './components/common/SideMenu';

// Main tab pages
import Dashboard from './pages/Dashboard';
import FieldCheck from './pages/FieldCheck';
import Advisor from './pages/Advisor';
import Market from './pages/Market';
import MyFarm from './pages/MyFarm';
import Tools from './pages/Tools';
import Events from './pages/Events';
import Library from './pages/Library';

// Side menu pages
import FarmRecord from './pages/FarmRecord';
import Farmbench from './pages/Farmbench';
import KnowledgeLibrary from './pages/KnowledgeLibrary';
import ResearchProjects from './pages/ResearchProjects';
import MonitorFarm from './pages/MonitorFarm';
import EventsNearMe from './pages/EventsNearMe';
import ToolsCalculators from './pages/ToolsCalculators';
import Settings from './pages/Settings';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleSideMenu = () => {
    setMenuOpen(prev => !prev);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <Header toggleSideMenu={toggleSideMenu} />
      
      <main className="flex-1 overflow-y-auto">
        <Routes>
          {/* Main tab routes */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/home" element={<Dashboard />} />
          <Route path="/field-check" element={<FieldCheck />} />
          <Route path="/advice" element={<Advisor />} />
          <Route path="/market" element={<Market />} />
          <Route path="/my-farm" element={<MyFarm />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/events" element={<Events />} />
          <Route path="/library" element={<Library />} />
          
          {/* Side menu routes */}
          <Route path="/farm-record" element={<FarmRecord />} />
          <Route path="/farmbench" element={<Farmbench />} />
          <Route path="/knowledge-library" element={<KnowledgeLibrary />} />
          <Route path="/research-projects" element={<ResearchProjects />} />
          <Route path="/monitor-farm" element={<MonitorFarm />} />
          <Route path="/events-near-me" element={<EventsNearMe />} />
          <Route path="/tools-calculators" element={<ToolsCalculators />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </main>
      
      <Navigation />
      
      <SideMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </div>
  );
}

export default App;
