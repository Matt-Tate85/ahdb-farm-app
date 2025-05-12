// src/components/layout/Footer.jsx

import React from 'react';
import { useDevice } from '../../contexts/DeviceContext';

const Footer = () => {
  const { isMobile, isTablet, safeAreaInsets } = useDevice();
  
  // Simplified footer for mobile due to bottom navigation
  const isSimplifiedFooter = isMobile || isTablet;
  
  if (isSimplifiedFooter) {
    return (
      <footer className="bg-white text-center text-xs text-gray-500 py-2 border-t border-gray-200 safe-area-padding">
        © {new Date().getFullYear()} AHDB. All rights reserved.
      </footer>
    );
  }
  
  return (
    <footer className="bg-white border-t border-gray-200 py-6 text-sm text-gray-600 safe-area-padding">
      <div className="container mx-auto px-4 md:px-6 md:pl-64">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-medium mb-2">About AHDB</h4>
            <p className="text-sm text-gray-500">
              Agriculture and Horticulture Development Board (AHDB) delivers transformational 
              information to the agricultural and horticultural sectors.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Contact</h4>
            <p className="text-sm text-gray-500">
              AHDB, Stoneleigh Park, Kenilworth, Warwickshire, CV8 2TL<br />
              T: 024 7669 2051<br />
              E: info@ahdb.org.uk
            </p>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Links</h4>
            <ul className="space-y-1">
              <li><a href="#" className="text-blue-600 hover:underline">Terms & Conditions</a></li>
              <li><a href="#" className="text-blue-600 hover:underline">Privacy Policy</a></li>
              <li><a href="#" className="text-blue-600 hover:underline">Cookies</a></li>
              <li><a href="#" className="text-blue-600 hover:underline">Accessibility</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <p>© {new Date().getFullYear()} Agriculture and Horticulture Development Board. All rights reserved.</p>
          <div className="mt-2 md:mt-0">
            <img src="/assets/ahdb-logo-small.png" alt="AHDB Logo" className="h-6" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
