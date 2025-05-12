// src/App.jsx - Fixed version without the missing Assistant page

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet'; // You may need to install this package
import { SectorProvider } from './contexts/SectorContext';
import { DeviceProvider } from './contexts/DeviceContext';

// Layout components
import Header from './components/layout/Header';
import Navigation from './components/layout/Navigation';
import Footer from './components/layout/Footer';

// Page components
import Dashboard from './pages/Dashboard';
import FieldCheck from './pages/FieldCheck';
import Market from './pages/Market';
import Events from './pages/Events';
import Library from './pages/Library';
import Tools from './pages/Tools';
// import Assistant from './pages/Assistant'; // Removed this import
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';

const App = () => {
  return (
    <SectorProvider>
      <DeviceProvider>
        <Router>
          <Helmet>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
            <meta name="theme-color" content="#ffffff" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <title>AHDB FarmAssist</title>
          </Helmet>
          
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
                  {/* Removed the Assistant route */}
                  <Route path="/settings" element={<Settings />} />
                  <Route path="*" element={<NotFound />} />
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
