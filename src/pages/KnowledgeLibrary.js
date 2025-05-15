// KnowledgeLibrary.js
import React, { useState } from 'react';
import SectorSelector from '../components/common/SectorSelector';
import { useSector } from '../contexts/SectorContext';
import { BookOpen, Search, ChevronRight, FileText, BookMarked, Download } from 'lucide-react';
import { getPublicationName } from '../utils/helpers';

/**
 * KnowledgeLibrary Page
 * Comprehensive AHDB knowledge resources
 */
const KnowledgeLibrary = () => {
  const { selectedSector } = useSector();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  // Sample featured publications
  const featuredPublications = [
    {
      id: 1,
      title: getPublicationName(selectedSector, 1),
      type: 'Guide',
      date: 'May 2025',
      description: 'Comprehensive guide covering all aspects of crop management and development stages.',
      downloadCount: 1250
    },
    {
      id: 2,
      title: getPublicationName(selectedSector, 2),
      type: 'Technical Report',
      date: 'April 2025',
      description: 'Technical information and best practice recommendations for improved farm productivity.',
      downloadCount: 987
    }
  ];

  // Sample recent publications
  const recentPublications = [
    {
      id: 3,
      title: selectedSector === 'cereals' ? 'Nitrogen Use Efficiency' :
             selectedSector === 'dairy' ? 'Transition Cow Management' :
             selectedSector === 'beef' ? 'Grazing Strategies' :
             'Reducing Antibiotic Usage',
      type: 'Research Paper',
      date: 'May 2025',
      description: 'Latest research findings and practical applications for on-farm implementation.'
    },
    {
      id: 4,
      title: selectedSector === 'cereals' ? 'Integrated Pest Management' :
             selectedSector === 'dairy' ? 'Forage Analysis Guide' :
             selectedSector === 'beef' ? 'Cattle Housing Systems' :
             'Optimising Feed Efficiency', // Translate here
      type: 'Technical Guide',
      date: 'April 2025',
      description: 'Detailed guidance on implementing sustainable and effective management practices.'
    },
    {
      id: 5,
      title: selectedSector === 'cereals' ? 'Machinery Cost Calculator' :
             selectedSector === 'dairy' ? 'Milk Contract Comparison' :
             selectedSector === 'beef' ? 'Financial Planning Tool' :
             'Production Cost Analysis',
      type: 'Tool',
      date: 'March 2025',
      description: 'Interactive tools to help with financial planning and business management decisions.'
    }
  ];

  // Filter tabs
  const filterTabs = [
    { id: 'all', label: 'All Publications' },
    { id: 'guides', label: 'Guides' },
    { id: 'research', label: 'Research' },
    { id: 'tools', label: 'Tools' },
    { id: 'case-studies', label: 'Case Studies' }
  ];

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-lg font-semibold text-gray-700">AHDB Knowledge Library</h2>

      <SectorSelector />

      <div className="bg-white rounded-lg shadow p-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            className="w-full border rounded-lg pl-10 pr-4 py-2 border-neutral-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search the AHDB Knowledge Library..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search publications"
          />
        </div>

        <div className="flex overflow-x-auto mt-3 pb-1">
          {filterTabs.map(tab => (
            <button
              key={tab.id}
              className={`px-3 py-1 text-sm whitespace-nowrap mr-2 rounded-full ${
                activeFilter === tab.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setActiveFilter(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium flex items-center">
            <BookMarked size={18} className="mr-2 text-blue-500" />
            Featured Publications
          </h3>
        </div>

        <div className="space-y-4">
          {featuredPublications.map(pub => (
            <div key={pub.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="text-base font-medium">{pub.title}</h4>
                  <div className="flex items-center mt-1">
                    <span className="bg-blue-50 text-blue-600 text-xs px-2 py-1 rounded-full mr-2">{pub.type}</span>
                    <span className="text-xs text-gray-500">{pub.date}</span>
                  </div>
                </div>
                <button className="bg-blue-500 text-white text-xs px-3 py-1 rounded-lg flex items-center">
                  <Download size={14} className="mr-1" />
                  Download
                </button>
              </div>
              <p className="text-sm text-gray-700 mb-2">{pub.description}</p>
              <div className="text-xs text-gray-500">{pub.downloadCount} downloads</div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium flex items-center">
            <FileText size={18} className="mr-2 text-green-600" />
            Recent Publications
          </h3>
          <button className="text-xs text-blue-500">
            View All
          </button>
        </div>

        <div className="space-y-3">
          {recentPublications.map(pub => (
            <div key={pub.id} className="border rounded-lg p-3">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-sm font-medium">{pub.title}</h4>
                  <div className="flex items-center mt-1">
                    <span className="bg-green-50 text-green-600 text-xs px-2 py-0.5 rounded-full mr-2">{pub.type}</span>
                    <span className="text-xs text-gray-500">{pub.date}</span>
                  </div>
                </div>
                <button className="text-blue-500">
                  <ChevronRight size={18} />
                </button>
              </div>
              <p className="text-xs text-gray-700 mt-2">{pub.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="font-medium mb-3 flex items-center">
          <BookOpen size={18} className="mr-2 text-amber-600" />
          Specialist Collections
        </h3>

        <div className="space-y-2">
          <div className="flex justify-between items-center p-2 border-b hover:bg-gray-50 rounded">
            <span className="text-sm">{selectedSector === 'cereals' ? 'Crop Protection' :
                                     selectedSector === 'dairy' ? 'Dairy Nutrition' :
                                     selectedSector === 'beef' ? 'Cattle Health' :
                                     'Pig Production'}</span>
            <ChevronRight size={16} />
          </div>
          <div className="flex justify-between items-center p-2 border-b hover:bg-gray-50 rounded">
            <span className="text-sm">Soil Management</span>
            <ChevronRight size={16} />
          </div>
          <div className="flex justify-between items-center p-2 border-b hover:bg-gray-50 rounded">
            <span className="text-sm">Business Management</span>
            <ChevronRight size={16} />
          </div>
          <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
            <span className="text-sm">Climate & Environment</span>
            <ChevronRight size={16} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeLibrary;