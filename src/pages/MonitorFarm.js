// MonitorFarm.js
import React from 'react';
import SectorSelector from '../components/common/SectorSelector';
import { useSector } from '../contexts/SectorContext';
import { MapPin, Calendar, ChevronRight, ExternalLink, Users, Clock } from 'lucide-react';

/**
 * MonitorFarm Page
 * Information about local AHDB monitor farms
 */
const MonitorFarm = () => {
  const { selectedSector } = useSector();

  // Monitor farm details based on sector
  const monitorFarm = {
    cereals: {
      name: 'Wold Newton Monitor Farm',
      location: 'East Yorkshire',
      farmer: 'James Wilson',
      area: '320 hectares',
      enterprises: 'Winter wheat, winter barley, oilseed rape, spring beans',
      description: 'This Monitor Farm focuses on improving soil health, integrated pest management and optimising input use in arable rotations.' // Translate optimising
    },
    dairy: {
      name: 'Mountfair Strategic Dairy Farm',
      location: 'Cumbria',
      farmer: 'Sarah Johnson',
      area: '180 hectares',
      enterprises: 'Grass-based dairy, 250 Holstein Friesian cows',
      description: 'This Strategic Dairy Farm showcases efficient grass utilisation, optimised nutrition management and sustainable dairy production systems.' // Translate utilisation, optimised
    },
    beef: {
      name: 'Hill Top Better Returns Farm',
      location: 'North Yorkshire',
      farmer: 'Robert Thompson',
      area: '220 hectares',
      enterprises: 'Suckler beef herd, breeding sheep, forage crops',
      description: 'This farm demonstrates grassland management, efficient breeding programmes and sustainable beef production methods.' // Translate programmes
    },
    pork: {
      name: 'Riverside Pig Farm',
      location: 'Suffolk',
      farmer: 'David Miller',
      area: '120 hectares',
      enterprises: 'Indoor pig unit, 500 sows, home-mixed feed',
      description: 'This unit focuses on pig health and welfare, production efficiency and environmental management systems.'
    }
  };

  // Upcoming events at the monitor farm
  const upcomingEvents = [
    {
      title: selectedSector === 'cereals' ? 'Summer Crop Walk' :
             selectedSector === 'dairy' ? 'Grassland Management Meeting' :
             selectedSector === 'beef' ? 'Cattle Health Workshop' :
             'Pig Production Efficiency Day',
      date: '15 June 2025',
      time: '10:00 - 14:30',
      location: monitorFarm[selectedSector].name,
      description: 'Join us for a practical demonstration of seasonal management practices and discussion of current challenges.'
    },
    {
      title: selectedSector === 'cereals' ? 'Soil Health Workshop' :
             selectedSector === 'dairy' ? 'Nutrition Management Meeting' :
             selectedSector === 'beef' ? 'Breeding Selection Event' :
             'Health Management Workshop',
      date: '22 July 2025',
      time: '13:00 - 16:00',
      location: monitorFarm[selectedSector].name,
      description: 'Expert-led workshop focusing on sustainable and profitable management systems.'
    }
  ];

  // Recent findings from the monitor farm
  const recentFindings = [
    {
      title: selectedSector === 'cereals' ? 'Reduced Cultivation Trial Results' :
             selectedSector === 'dairy' ? 'Mastitis Control Programme Findings' : // Translate Programme
             selectedSector === 'beef' ? 'Grazing System Comparisons' :
             'Feed Efficiency Improvement Data',
      date: 'May 2025',
      summary: 'Recent trial results show promising improvements in efficiency and sustainability metrics.'
    },
    {
      title: selectedSector === 'cereals' ? 'Variable Rate Application Analysis' :
             selectedSector === 'dairy' ? 'Milk Production Efficiency Review' :
             selectedSector === 'beef' ? 'Growth Rate Comparison Study' :
             'Mortality Reduction Initiative Outcomes',
      date: 'April 2025',
      summary: 'Analysis of recent management changes shows potential for significant cost savings.'
    }
  ];

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-lg font-semibold text-gray-700">AHDB Local Monitor Farm</h2>

      <SectorSelector />

      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium">{monitorFarm[selectedSector].name}</h3>
          <span className="bg-blue-50 text-blue-600 text-xs px-2 py-1 rounded-full">
            {selectedSector === 'cereals' ? 'Monitor Farm' :
             selectedSector === 'dairy' ? 'Strategic Dairy Farm' :
             selectedSector === 'beef' ? 'Better Returns Farm' :
             'Pig Demo Farm'}
          </span>
        </div>

        <div className="h-48 bg-blue-200 rounded-lg flex justify-center items-center mb-4">
          <span className="text-white">Farm map and images would display here</span>
        </div>

        <div className="mb-4">
          <div className="flex items-center text-sm text-gray-700 mb-1">
            <MapPin size={16} className="mr-1 text-blue-500" />
            {monitorFarm[selectedSector].location}
          </div>
          <div className="text-sm text-gray-700">
            <span className="font-medium">Farmer:</span> {monitorFarm[selectedSector].farmer}
          </div>
          <div className="text-sm text-gray-700">
            <span className="font-medium">Area:</span> {monitorFarm[selectedSector].area}
          </div>
          <div className="text-sm text-gray-700">
            <span className="font-medium">Main Enterprises:</span> {monitorFarm[selectedSector].enterprises}
          </div>
        </div>

        <p className="text-sm text-gray-700 mb-4">
          {monitorFarm[selectedSector].description}
        </p>

        <button className="w-full py-2 rounded-lg bg-blue-500 text-white">
          View Full Farm Profile
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium flex items-center">
            <Calendar size={18} className="mr-2 text-green-600" />
            Upcoming Events
          </h3>
          <button className="text-xs text-blue-500 flex items-center">
            <ExternalLink size={14} className="mr-1" />
            View All
          </button>
        </div>

        <div className="space-y-3">
          {upcomingEvents.map((event, i) => (
            <div key={i} className="border rounded-lg p-3">
              <h4 className="text-sm font-medium">{event.title}</h4>
              <div className="flex flex-wrap text-xs text-gray-600 my-1">
                <div className="flex items-center mr-3">
                  <Calendar size={14} className="mr-1 text-green-600" />
                  {event.date}, {event.time}
                </div>
                <div className="flex items-center">
                  <MapPin size={14} className="mr-1 text-green-600" />
                  {event.location}
                </div>
              </div>
              <p className="text-xs text-gray-700">{event.description}</p>
              <div className="mt-2 flex justify-end">
                <button className="text-xs text-blue-500 flex items-center">
                  Book Place
                  <ChevronRight size={14} className="ml-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="font-medium mb-3 flex items-center">
          <Users size={18} className="mr-2 text-amber-600" />
          Recent Findings
        </h3>

        <div className="space-y-3">
          {recentFindings.map((finding, i) => (
            <div key={i} className="p-3 border-b last:border-0">
              <div className="flex justify-between items-start">
                <h4 className="text-sm font-medium">{finding.title}</h4>
                <span className="text-xs text-gray-500">{finding.date}</span>
              </div>
              <p className="text-xs text-gray-700 mt-1">{finding.summary}</p>
              <button className="text-xs text-blue-500 mt-1">
                Read Report →
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MonitorFarm;