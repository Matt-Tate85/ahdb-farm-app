// Library.js
import React from 'react';
import SectorSelector from '../components/common/SectorSelector';
import { useSector } from '../contexts/SectorContext';
import { ChevronRight } from 'lucide-react';
import { getPublicationName } from '../utils/helpers';

/**
 * Library Page
 * AHDB knowledge library and publications
 */
const Library = () => {
  const { selectedSector } = useSector();

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-lg font-semibold text-gray-700">AHDB Knowledge Library</h2>

      <SectorSelector />

      <div className="bg-white rounded-lg shadow p-4">
        <div className="relative">
          <input
            className="w-full border rounded-lg px-3 py-2 pr-8 border-neutral-300"
            placeholder="Search AHDB publications..."
            aria-label="Search publications"
          />
          <div className="absolute right-3 top-2 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="font-medium mb-3">Recent Publications</h3>

        <div className="space-y-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="p-3 border rounded-lg">
              <div className="text-sm font-medium">
                {getPublicationName(selectedSector, i)}
              </div>
              <div className="text-xs text-gray-500 mb-2">Published: May 2025</div>
              <div className="text-xs">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </div>
              <div className="mt-2">
                <button className="text-xs text-blue-500">
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="font-medium mb-3">Publication Categories</h3>

        <div className="space-y-2">
          <div className="flex justify-between items-center p-2 border-b">
            <span>Research Papers</span>
            <ChevronRight size={16} />
          </div>
          <div className="flex justify-between items-center p-2 border-b">
            <span>Technical Guides</span>
            <ChevronRight size={16} />
          </div>
          <div className="flex justify-between items-center p-2 border-b">
            <span>Market Intelligence</span>
            <ChevronRight size={16} />
          </div>
          <div className="flex justify-between items-center p-2">
            <span>Case Studies</span>
            <ChevronRight size={16} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Library;