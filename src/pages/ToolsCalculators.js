import React, { useState } from 'react';
import SectorSelector from '../components/common/SectorSelector';
import { useSector } from '../contexts/SectorContext';
import { Calculator, Search, Star, Clock, ChevronRight, ExternalLink } from 'lucide-react';

/**
 * ToolsCalculators Page
 * Comprehensive listing of AHDB tools and calculators
 */
const ToolsCalculators = () => {
  const { selectedSector } = useSector();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  // Tool categories
  const categories = [
    { id: 'all', label: 'All Tools' },
    { id: 'business', label: 'Business' },
    { id: 'production', label: 'Production' },
    { id: 'nutrient', label: 'Nutrient' },
    { id: 'environmental', label: 'Environmental' }
  ];

  // Featured tools
  const featuredTools = [
    {
      id: 'farmbench',
      name: 'AHDB Farmbench',
      description: 'Benchmark your farm business performance against similar farms and identify opportunities for improvement.',
      category: 'business',
      relevantSectors: ['cereals', 'dairy', 'beef', 'pork']
    },
    {
      id: selectedSector === 'cereals' ? 'rb209' : 
          selectedSector === 'dairy' ? 'feed-planning' :
          selectedSector === 'beef' ? 'graze-planning' :
          'production-calculator',
      name: selectedSector === 'cereals' ? 'RB209 Nutrient Calculator' : 
           selectedSector === 'dairy' ? 'Feed Planning Tool' :
           selectedSector === 'beef' ? 'Grazing Planning Tool' :
           'Pig Production Calculator',
      description: selectedSector === 'cereals' ? 'Calculate crop nutrient requirements based on soil type, previous cropping and expected yields.' : 
                  selectedSector === 'dairy' ? 'Plan and optimize dairy cow rations to maximize milk production efficiency.' :
                  selectedSector === 'beef' ? 'Plan rotational grazing to optimize grass utilization and livestock performance.' :
                  'Track and analyze pig production metrics to identify improvement opportunities.',
      category: selectedSector === 'cereals' ? 'nutrient' : 'production',
      relevantSectors: [selectedSector]
    }
  ];

  // All tools
  const allTools = [
    ...featuredTools,
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
      id: selectedSector === 'cereals' ? 'spray-planning' : 
          selectedSector === 'dairy' ? 'milk-price' :
          selectedSector === 'beef' ? 'feed-profit' :
          'finisher-tool',
      name: selectedSector === 'cereals' ? 'Spray Planning Tool' : 
           selectedSector === 'dairy' ? 'Milk Price Calculator' :
           selectedSector === 'beef' ? 'Feed to Profit' :
           'Finisher Tool',
      description: selectedSector === 'cereals' ? 'Plan spray applications with timing recommendations based on crop growth stage and weather.' : 
                  selectedSector === 'dairy' ? 'Compare milk contracts and calculate the value of your milk under different pricing scenarios.' :
                  selectedSector === 'beef' ? 'Calculate the cost-benefit of different feeding regimes for finishing cattle.' :
                  'Track and optimize finishing pig performance and costs.',
      category: 'production',
      relevantSectors: [selectedSector]
    },
    {
      id: selectedSector === 'cereals' ? 'machinery-cost' : 
          selectedSector === 'dairy' ? 'heifer-rearing' :
          selectedSector === 'beef' ? 'calf-selection' :
          'building-cost',
      name: selectedSector === 'cereals' ? 'Machinery Cost Calculator' : 
           selectedSector === 'dairy' ? 'Heifer Rearing Calculator' :
           selectedSector === 'beef' ? 'Calf Selection Tool' :
           'Building Cost Calculator',
      description: selectedSector === 'cereals' ? 'Calculate the true cost of machinery ownership and compare ownership vs. contracting options.' : 
                  selectedSector === 'dairy' ? 'Calculate the costs of rearing dairy heifers and identify efficiency savings.' :
                  selectedSector === 'beef' ? 'Select the most suitable calves for beef production based on breeding and conformation.' :
                  'Calculate and compare different pig housing options and ventilation systems.',
      category: 'business',
      relevantSectors: [selectedSector]
    },
    {
      id: 'water-management',
      name: 'Water Management Tool',
      description: 'Plan irrigation scheduling and optimize water use efficiency on your farm.',
      category: 'environmental',
      relevantSectors: ['cereals', 'dairy', 'beef', 'pork']
    }
  ];

  // Filter tools based on search, category and sector
  const filteredTools = allTools.filter(tool => {
    // Category filter
    if (activeCategory !== 'all' && tool.category !== activeCategory) {
      return false;
    }
    
    // Sector filter
    if (!tool.relevantSectors.includes(selectedSector)) {
      return false;
    }
    
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        tool.name.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query)
      );
    }
    
    return true;
  });

  // Recently used tools (sample data)
  const recentlyUsedTools = [
    allTools.find(tool => tool.id === 'farmbench'),
    allTools.find(tool => 
      tool.id === (selectedSector === 'cereals' ? 'rb209' : 
                  selectedSector === 'dairy' ? 'feed-planning' :
                  selectedSector === 'beef' ? 'graze-planning' :
                  'production-calculator'))
  ];

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
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search tools"
          />
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
          {filteredTools.map(tool => (
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
          ))}
          
          {filteredTools.length === 0 && (
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
                <div className="text-xs text-gray-500">Last used: 3 days ago</div>
              </div>
              <button className="text-blue-500">
                <ExternalLink size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="font-medium mb-3 flex items-center">
          <Star size={18} className="mr-2 text-amber-500" />
          Tool Recommendations
        </h3>
        
        <p className="text-sm text-gray-700 mb-3">
          Based on your farm profile and recent activity, these tools might be helpful:
        </p>
        
        <div className="space-y-2">
          {featuredTools.map(tool => (
            <div key={tool.id} className="p-3 border rounded-lg flex justify-between items-center">
              <div>
                <div className="text-sm font-medium">{tool.name}</div>
                <div className="text-xs text-gray-700">{tool.description.substring(0, 60)}...</div>
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
