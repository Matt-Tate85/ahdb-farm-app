import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './styles/index.css';
import App from './App';
import { SectorProvider } from './contexts/SectorContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <SectorProvider>
        <App />
      </SectorProvider>
    </BrowserRouter>
  </React.StrictMode>
);
