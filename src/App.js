// src/App.js - With error boundary

import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

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

// Error boundary component to catch rendering errors
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ color: 'red' }}>Something went wrong</h1>
          <details style={{ whiteSpace: 'pre-wrap', marginTop: '20px' }}>
            <summary>Error details</summary>
            <p>{this.state.error && this.state.error.toString()}</p>
            <p>Component stack trace:</p>
            <pre>{this.state.errorInfo && this.state.errorInfo.componentStack}</pre>
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

// Main App component
function App() {
  return (
    <ErrorBoundary>
      <div className="app flex flex-col min-h-screen bg-gray-50">
        <BrowserRouter>
          <header className="bg-white border-b border-gray-200 p-4">
            <h1 className="text-xl font-bold">AHDB FarmAssist</h1>
          </header>
          
          <main className="flex-grow">
            <div className="container mx-auto px-4 py-4">
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
          </main>
          
          <footer className="bg-white border-t border-gray-200 p-4 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} AHDB. All rights reserved.
          </footer>
        </BrowserRouter>
      </div>
    </ErrorBoundary>
  );
}

export default App;
