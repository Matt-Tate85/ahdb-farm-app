// ToolsCalculators.js
import React, { useState } from 'react';
import SectorSelector from '../components/common/SectorSelector';
import { useSector } from '../contexts/SectorContext';
import { Calculator, Search, Star, Clock, ChevronRight, ExternalLink, Loader } from 'lucide-react'; // Added Loader icon

/**
 * ToolsCalculators Page
 * Comprehensive listing of AHDB tools and calculators
 */
const ToolsCalculators = () => {
  const { selectedSector } = useSector();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
   const [isSearching, setIsSearching] = useState(false); // State for search indicator
  const [displayedTools, setDisplayedTools] = useState([]); // State for search results


  // Tool categories
  const categories = [
    { id: 'all', label: 'All Tools' },
    { id: 'business', label: 'Business' },
    { id: 'production', label: 'Production' },
    { id: 'nutrient', label: 'Nutrient' },
    { id: 'environmental', label: 'Environmental' }
  ];

  // All tools (including those previously featured)
  const allTools = [
    {
      id: 'farmbench',
      name: 'AHDB Farmbench',
      description: 'Benchmark your farm business performance against similar farms and identify opportunities for improvement.',
      category: 'business',
      relevantSectors: ['cereals', 'dairy', 'beef', 'pork']
    },
    {
      id: 'rb209',
      name: 'RB209 Nutrient Calculator',
      description: 'Calculate crop nutrient requirements based on soil type, previous cropping and expected yields.',
      category: 'nutrient',
      relevantSectors: ['cereals']
    },
    {
      id: 'feed-planning',
      name: 'Feed Planning Tool',
      description: 'Plan and optimise dairy cow rations to maximise milk production efficiency.',
      category: 'production',
      relevantSectors: ['dairy']
    },
     {
      id: 'graze-planning',
      name: 'Grazing Planning Tool',
      description: 'Plan rotational grazing to optimise grass utilisation and livestock performance.',
      category: 'production',
      relevantSectors: ['beef']
    },
     {
      id: 'production-calculator',
      name: 'Pig Production Calculator',
      description: 'Track and analyse pig production metrics to identify improvement opportunities.',
      category: 'production',
      relevantSectors: ['pork']
    },
    {
      id: 'gross-margin',
      name: 'Gross Margin Calculator',
      description: 'Calculate and compare gross margins for different enterprises to support decision making.',
      category: 'business',
      relevantSectors: ['cereals', 'dairy', 'beef', 'pork']
    },
    {
      id: 'carbon-footprint',
      name: 'Carbon Footprint Calculator',
      description: 'Measure your farm\'s carbon footprint and identify opportunities to reduce emissions.',
      category: 'environmental',
      relevantSectors: ['cereals', 'dairy', 'beef', 'pork']
    },
    {
      id: 'spray-planning',
      name: 'Spray Planning Tool',
      description: 'Plan spray applications with timing recommendations based on crop growth stage and weather.',
      category: 'production',
      relevantSectors: ['cereals']
    },
    {
      id: 'milk-price',
      name: 'Milk Price Calculator',
      description: 'Compare milk contracts and calculate the value of your milk under different pricing scenarios.',
      category: 'business', // Changed from production to business as it's financial
      relevantSectors: ['dairy']
    },
    {
      id: 'feed-profit',
      name: 'Feed to Profit',
      description: 'Calculate the cost-benefit of different feeding regimes for finishing cattle.',
      category: 'business', // Changed from production to business as it's financial
      relevantSectors: ['beef']
    },
     {
      id: 'finisher-tool',
      name: 'Finisher Tool',
      description: 'Track and optimise finishing pig performance and costs.',
      category: 'production',
      relevantSectors: ['pork']
    },
    {
      id: 'machinery-cost',
      name: 'Machinery Cost Calculator',
      description: 'Calculate the true cost of machinery ownership and compare ownership vs. contracting options.',
      category: 'business',
      relevantSectors: ['cereals', 'dairy', 'beef', 'pork']
    },
    {
      id: 'heifer-rearing',
      name: 'Heifer Rearing Calculator',
      description: 'Calculate the costs of rearing dairy heifers and identify efficiency savings.',
      category: 'business',
      relevantSectors: ['dairy']
    },
    {
      id: 'calf-selection',
      name: 'Calf Selection Tool',
      description: 'Select the most suitable calves for beef production based on breeding and conformation.',
      category: 'production',
      relevantSectors: ['beef']
    },
    {
      id: 'building-cost',
      name: 'Building Cost Calculator',
      description: 'Calculate and compare different pig housing options and ventilation systems.',
      category: 'business',
      relevantSectors: ['pork']
    },
    {
      id: 'water-management',
      name: 'Water Management Tool',
      description: 'Plan irrigation scheduling and optimise water use efficiency on your farm.',
      category: 'environmental',
      relevantSectors: ['cereals', 'dairy', 'beef', 'pork']
    }
  ];

   // Simulate search functionality
  const handleSearch = (query) => {
    setSearchQuery(query);
    setIsSearching(true); // Start searching indicator

    // Simulate search delay
    setTimeout(() => {
      const filtered = allTools.filter(tool =>
        tool.name.toLowerCase().includes(query.toLowerCase()) ||
        tool.description.toLowerCase().includes(query.toLowerCase()) ||
         (categories.find(cat => cat.id === tool.category)?.label || tool.category).toLowerCase().includes(query.toLowerCase())
      );
      setDisplayedTools(query ? filtered : []); // Show results only if query exists
      setIsSearching(false); // Stop searching indicator
    }, 1000); // Simulate 1 second search time
  };


  // Filter tools based on search, category and sector
  const filteredTools = (searchQuery ? displayedTools : allTools).filter(tool => { // Use displayedTools after search
    // Category filter
    if (activeCategory !== 'all' && tool.category !== activeCategory) {
      return false;
    }

    // Sector filter
    if (!tool.relevantSectors.includes(selectedSector)) {
      return false;
    }

    return true;
  });

  // Recently used tools (sample data - now linked to allTools by id)
  const recentlyUsedTools = [
    allTools.find(tool => tool.id === 'farmbench'),
    allTools.find(tool => tool.id === (selectedSector === 'cereals' ? 'rb209' :
                                       selectedSector === 'dairy' ? 'feed-planning' :
                                       selectedSector === 'beef' ? 'graze-planning' :
                                       'production-calculator'))
  ].filter(tool => tool); // Filter out any undefined if tool ID not found


  return (
    <div className="p-4 space-y-4">
      <h2 className="text-lg font-semibold text-gray-700">AHDB Tools & Calculators</h2>

      <SectorSelector />

      <div className="bg-white rounded-lg shadow p-4">
        <div className="relative mb-3">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            className="w-full border rounded-lg pl-10 pr-4 py-2 border-neutral-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search for tools..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)} // Use handleSearch
            aria-label="Search tools"
          />
           {isSearching && ( // Show loading indicator while searching
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Loader size={18} className="animate-spin text-gray-400" />
              </div>
          )}
        </div>

        <div className="flex overflow-x-auto pb-2 mb-3">
          {categories.map(category => (
            <button
              key={category.id}
              className={`px-3 py-1 text-sm whitespace-nowrap mr-2 rounded-full ${
                activeCategory === category.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className="space-y-4">
           {isSearching ? (
               <div className="p-4 text-center text-gray-500">Scanning resources...</div> // Simplified scanning indicator
           ) : filteredTools.length > 0 ? (
               filteredTools.map(tool => (
                   <div key={tool.id} className="border rounded-lg p-4">
                       <div className="flex justify-between items-start mb-2">
                           <h4 className="text-base font-medium">{tool.name}</h4>
                           <span className={`text-xs px-2 py-1 rounded-full ${
                             tool.category === 'business' ? 'bg-blue-50 text-blue-600' :
                             tool.category === 'production' ? 'bg-green-50 text-green-600' :
                             tool.category === 'nutrient' ? 'bg-amber-50 text-amber-600' :
                             'bg-purple-50 text-purple-600'
                           }`}>
                             {categories.find(cat => cat.id === tool.category)?.label || tool.category}
                           </span>
                       </div>

                       <p className="text-sm text-gray-700 mb-3">{tool.description}</p>

                       <button className="bg-blue-500 text-white text-sm px-4 py-2 rounded-lg w-full">
                           Launch Tool
                       </button>
                   </div>
               ))
           ) : (
            <div className="p-4 text-center text-gray-500">
              <Calculator size={32} className="mx-auto mb-2 text-gray-400" />
              <p>No tools found matching your criteria</p>
              <p className="text-sm mt-1">Try adjusting your filters or search query</p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium flex items-center">
            <Clock size={18} className="mr-2 text-green-600" />
            Recently Used Tools
          </h3>
        </div>

        <div className="space-y-2">
          {recentlyUsedTools.map(tool => (
            <div key={tool.id} className="p-3 border-b last:border-0 flex justify-between items-center">
              <div>
                <div className="text-sm font-medium">{tool.name}</div>
                <div className="text-xs text-gray-500">Last used: 3 days ago</div> {/* Keep placeholder */}
              </div>
              <button className="text-blue-500">
                <ExternalLink size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium flex items-center">
            <Star size={18} className="mr-2 text-amber-500" />
            Tool Recommendations
          </h3>
        </div>

        <p className="text-sm text-gray-700 mb-3">
          Based on your farm profile and recent activity, these tools might be helpful:
        </p>

        <div className="space-y-2">
          {/* Display a selection of relevant tools, here using featuredTools as a simple example */}
          {featuredTools.filter(tool => tool.relevantSectors.includes(selectedSector)).map(tool => (
            <div key={tool.id} className="p-3 border rounded-lg flex justify-between items-center">
              <div>
                <div className="text-sm font-medium">{tool.name}</div>
                 {/* Show truncated description */}
                <div className="text-xs text-gray-700">{tool.description.substring(0, 60)}{tool.description.length > 60 ? '...' : ''}</div>
              </div>
              <button className="text-blue-500">
                <ChevronRight size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ToolsCalculators;
