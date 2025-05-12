// src/components/layout/SimpleNavigation.js - Basic navigation with traditional syntax

import React from 'react';

const SimpleNavigation = () => {
  return React.createElement(
    'nav',
    { className: 'bg-gray-100 p-4 mb-4' },
    React.createElement(
      'ul',
      { className: 'flex space-x-4' },
      React.createElement(
        'li',
        null,
        React.createElement('a', { href: '/', className: 'text-blue-500 hover:underline' }, 'Dashboard')
      ),
      React.createElement(
        'li',
        null,
        React.createElement('a', { href: '/field-check', className: 'text-blue-500 hover:underline' }, 'Field Check')
      ),
      React.createElement(
        'li',
        null,
        React.createElement('a', { href: '/market', className: 'text-blue-500 hover:underline' }, 'Market')
      )
    )
  );
};

export default SimpleNavigation;
