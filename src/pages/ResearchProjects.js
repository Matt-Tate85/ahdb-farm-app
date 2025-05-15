// ResearchProjects.js
import React, { useState } from 'react';
import SectorSelector from '../components/common/SectorSelector';
import { useSector } from '../contexts/SectorContext';
import { Beaker, ChevronRight, Filter, MapPin, Users, Clock } from 'lucide-react';

/**
 * ResearchProjects Page
 * Displays AHDB-funded research projects
 */
const ResearchProjects = () => {
  const { selectedSector } = useSector();
  const [filterOpen, setFilterOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');

  // Filter categories
  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'crop-protection', label: 'Crop Protection' },
    { id: 'soil-health', label: 'Soil Health' },
    { id: 'animal-health', label: 'Animal Health' },
    { id: 'productivity', label: 'Productivity' },
    { id: 'environment', label: 'Environment' }
  ];

  // Research projects data
  const projects = [
    {
      id: 1,
      title: selectedSector === 'cereals' ? 'Optimising Nitrogen Use Efficiency in Winter Wheat' : // Translate Optimising
             selectedSector === 'dairy' ? 'Improving Forage Utilisation in Dairy Systems' : // Translate Utilisation
             selectedSector === 'beef' ? 'Grass-based Finishing Systems for Beef Cattle' :
             'Reducing Antibiotic Usage in Commercial Pig Production',
      institution: 'University of Nottingham',
      status: 'Active',
      startDate: 'January 2025',
      endDate: 'December 2026',
      category: selectedSector === 'cereals' ? 'crop-protection' : 'productivity',
      description: 'This project aims to develop practical strategies for improving resource efficiency while maintaining productivity, addressing the dual challenge of economic sustainability and environmental impact.'
    },
    {
      id: 2,
      title: selectedSector === 'cereals' ? 'Climate-Resilient Crop Varieties' :
             selectedSector === 'dairy' ? 'Transition Cow Management Strategies' :
             selectedSector === 'beef' ? 'Reducing Methane Emissions in Beef Systems' :
             'Optimising Indoor Environment for Pig Welfare', // Translate Optimising
      institution: 'Harper Adams University',
      status: 'Active',
      startDate: 'March 2024',
      endDate: 'February 2027',
      category: selectedSector === 'cereals' ? 'environment' : 'animal-health',
      description: 'A comprehensive research programme looking at adaptation strategies for farming systems to meet the challenges of climate change while maintaining productivity.' // Translate programme
    },
    {
      id: 3,
      title: selectedSector === 'cereals' ? 'Integrated Pest Management in Arable Systems' :
             selectedSector === 'dairy' ? 'Genomic Selection for Improved Health Traits' :
             selectedSector === 'beef' ? 'Optimising Grassland Management for Beef Production' : // Translate Optimising
             'Precision Nutrition in Pig Production',
      institution: 'Rothamsted Research',
      status: 'Active',
      startDate: 'September 2024',
      endDate: 'August 2027',
      category: selectedSector === 'cereals' ? 'crop-protection' : 'productivity',
      description: 'Investigating innovative approaches to reduce pest pressure while minimising environmental impact through reduced chemical inputs and improved management practices.' // Translate minimising
    },
    {
      id: 4,
      title: selectedSector === 'cereals' ? 'Soil Health in Arable Rotations' :
             selectedSector === 'dairy' ? 'Sustainable Protein Sources in Dairy Rations' :
             selectedSector === 'beef' ? 'Improving Beef Supply Chain Resilience' :
             'Novel Disease Surveillance Methods in Pig Herds',
      institution: 'Scotland\'s Rural College (SRUC)',
      status: 'Completed',
      startDate: 'January 2023',
      endDate: 'December 2024',
      category: selectedSector === 'cereals' ? 'soil-health' : 'animal-health',
      description: 'This project has developed new approaches to monitoring and improving soil health in agricultural systems, with particular focus on organic matter management and biological activity.'
    }
  ];

  // Filter projects based on selected category
  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter(project => project.category === activeCategory);

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-lg font-semibold text-gray-700">AHDB Research Projects</h2>

      <SectorSelector />

      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium flex items-center">
            <Beaker size={18} className="mr-2 text-blue-500" />
            Research Projects
          </h3>
          <button
            className="flex items-center text-sm text-gray-700 px-3 py-1 rounded-lg border border-gray-300"
            onClick={() => setFilterOpen(!filterOpen)}
          >
            <Filter size={16} className="mr-1" />
            Filter
          </button>
        </div>

        {filterOpen && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <div className="text-sm font-medium mb-2">Filter by category:</div>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  className={`px-3 py-1 text-xs rounded-full ${
                    activeCategory === category.id
                      ? 'bg-blue-500 text-white'
                      : 'bg-white text-gray-700 border border-gray-300'
                  }`}
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-4">
          {filteredProjects.map(project => (
            <div key={project.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-base font-medium">{project.title}</h4>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  project.status === 'Active'
                    ? 'bg-green-50 text-green-600'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {project.status}
                </span>
              </div>

              <div className="flex flex-wrap text-xs text-gray-600 mb-3 gap-y-1">
                <div className="flex items-center mr-4">
                  <Users size={14} className="mr-1" />
                  {project.institution}
                </div>
                <div className="flex items-center">
                  <Clock size={14} className="mr-1" />
                  {project.startDate} - {project.endDate}
                </div>
              </div>

              <p className="text-sm text-gray-700 mb-3">{project.description}</p>

              <div className="flex justify-between items-center">
                <span className="bg-blue-50 text-blue-600 text-xs px-2 py-1 rounded-full">
                  {categories.find(cat => cat.id === project.category)?.label || 'Research'}
                </span>
                <button className="text-blue-500 text-sm flex items-center">
                  View Project Details
                  <ChevronRight size={16} className="ml-1" />
                </button>
              </div>
            </div>
          ))}

          {filteredProjects.length === 0 && (
            <div className="p-4 text-center text-gray-500">
              <Beaker size={32} className="mx-auto mb-2 text-gray-400" />
              <p>No research projects found matching your criteria</p>
              <p className="text-sm mt-1">Try adjusting your filters</p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="font-medium mb-3">Get Involved in Research</h3>

        <p className="text-sm text-gray-700 mb-3">
          AHDB is always looking for farmers to participate in research trials and demonstration farms.
          By getting involved, you can help shape future farming practices and gain early access to
          innovative approaches.
        </p>

        <button className="w-full py-2 rounded-lg bg-green-600 text-white">
          Register Interest
        </button>
      </div>
    </div>
  );
};

export default ResearchProjects;