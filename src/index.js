// src/index.js - Correct JavaScript file

import React from 'react';
import ReactDOM from 'react-dom/client';
// Temporarily comment out the CSS import until we fix the file
// import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
