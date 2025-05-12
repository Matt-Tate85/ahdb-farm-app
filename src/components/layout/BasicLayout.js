// src/components/layout/BasicLayout.js - Simple layout with traditional syntax

import React from 'react';
import SimpleNavigation from './SimpleNavigation';

const BasicLayout = ({ children }) => {
  // Create the header
  const header = React.createElement(
    'header',
    { className: 'bg-white border-b border-gray-200 p-4' },
    React.createElement('h1', { className: 'text-xl font-bold' }, 'AHDB FarmAssist')
  );
  
  // Create the navigation
  const navigation = React.createElement(SimpleNavigation, null);
  
  // Create the main content area
  const main = React.createElement(
    'main',
    { className: 'flex-grow p-4' },
    children
  );
  
  // Create the footer
  const footer = React.createElement(
    'footer',
    { className: 'bg-white border-t border-gray-200 p-4 text-center text-sm text-gray-500' },
    `© ${new Date().getFullYear()} AHDB. All rights reserved.`
  );
  
  // Combine all elements in a container
  return React.createElement(
    'div',
    { className: 'flex flex-col min-h-screen bg-gray-50' },
    header,
    navigation,
    main,
    footer
  );
};

export default BasicLayout;
