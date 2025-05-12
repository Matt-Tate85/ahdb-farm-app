// src/index.js - With correct CSS import path

import React from 'react';
import ReactDOM from 'react-dom/client';
// Update the import path to point to the styles directory
import './styles/index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
