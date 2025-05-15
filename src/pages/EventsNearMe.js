// EventsNearMe.js
import React, { useState } from 'react';
import SectorSelector from '../components/common/SectorSelector';
import { useSector } from '../contexts/SectorContext';
import { Calendar, MapPin, Users, Search, ChevronRight, Filter } from 'lucide-react';

/**
 * EventsNearMe Page
 * Shows AHDB events in the user's local area
 */
const EventsNearMe = () => {
  const { selectedSector } = useSector();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDistance, setFilterDistance] = useState('50');
  const [filterType, setFilterType] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  // Event types
  const eventTypes = [
    { id: 'all', label: 'All Types' },
    { id: 'farm-walk', label: 'Farm Walks' },
    { id: 'workshop', label: 'Workshops' },
    { id: 'conference', label: 'Conferences' },
    { id: 'webinar', label: 'Webinars' }
  ];

  // Distance options
  const distanceOptions = [
    { value: '25', label: '25 miles' },
    { value: '50', label: '50 miles' },
    { value: '100', label: '100 miles' },
    { value: 'all', label: 'All UK' }
  ];

  // Sample events data
  const events = [
    {
      id: 1,
      title: selectedSector === 'cereals' ? 'Monitor Farm Meeting' :
             selectedSector === 'dairy' ? 'Strategic Dairy Farm Open Day' :
             selectedSector === 'beef' ? 'Better Returns Programme Workshop' : // Programme is already UK spelling
             'Pig Health and Performance Seminar',
      date: '20 May 2025',
      time: '10:00 - 15:00',
      location: 'Yorkshire Monitor Farm, Malton',
      distance: '15 miles',
      type: 'farm-walk',
      description: 'Join us for a practical demonstration of seasonal management practices and discussion of current challenges.',
      placesAvailable: 18
    },
    {
      id: 2,
      title: selectedSector === 'cereals' ? 'Soil Health Workshop' :
             selectedSector === 'dairy' ? 'Grassland Management Webinar' :
             selectedSector === 'beef' ? 'Lamb Selection Workshop' :
             'Reducing Production Costs Forum',
      date: '26 May 2025',
      time: '13:00 - 16:00',
      location: selectedSector === 'dairy' ? 'Online Webinar' : 'AHDB Stoneleigh Park, Warwickshire',
      distance: selectedSector === 'dairy' ? 'Online' : '78 miles',
      type: selectedSector === 'dairy' ? 'webinar' : 'workshop',
      description: 'Expert-led workshop focusing on sustainable and profitable management systems.',
      placesAvailable: 25
    },
    {
      id: 3,
      title: selectedSector === 'cereals' ? 'Integrated Pest Management Workshop' :
             selectedSector === 'dairy' ? 'Dairy Tech Best Practice Meeting' :
             selectedSector === 'beef' ? 'Pasture for Life Certification' :
             'Pig Finishing Efficiency Meeting',
      date: '8 June 2025',
      time: '11:00 - 14:30',
      location: 'North Yorkshire College, York',
      distance: '28 miles',
      type: 'workshop',
      description: 'A technical deep dive into best practices for efficient and sustainable farming systems.',
      placesAvailable: 12
    },
    {
      id: 4,
      title: selectedSector === 'cereals' ? 'Cereals 2025' :
             selectedSector === 'dairy' ? 'DairyTech 2025' :
             selectedSector === 'beef' ? 'Beef Expo 2025' :
             'Pig & Poultry Fair 2025',
      date: '15-16 June 2025',
      time: '09:00 - 17:00',
      location: 'East of England Showground, Peterborough',
      distance: '110 miles',
      type: 'conference',
      description: 'The premier industry event showcasing the latest innovations, research and products.',
      placesAvailable: 'Unlimited'
    }
  ];

  // Filter events based on search and filters
  const filteredEvents = events.filter(event => {
    // Distance filter
    if (filterDistance !== 'all') {
      if (event.distance === 'Online') {
        // Include online events regardless of distance
      } else {
        const distanceValue = parseInt(event.distance);
        if (distanceValue > parseInt(filterDistance)) {
          return false;
        }
      }
    }

    // Type filter
    if (filterType !== 'all' && event.type !== filterType) {
      return false;
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        event.title.toLowerCase().includes(query) ||
        event.location.toLowerCase().includes(query) ||
        event.description.toLowerCase().includes(query)
      );
    }

    return true;
  });

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-lg font-semibold text-gray-700">AHDB Events Near Me</h2>

      <SectorSelector />

      <div className="bg-white rounded-lg shadow p-4">
        <div className="relative mb-3">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            className="w-full border rounded-lg pl-10 pr-4 py-2 border-neutral-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search for events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search events"
          />
          <button
            className="absolute inset-y-0 right-0 px-3 flex items-center"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={18} className="text-gray-400" />
          </button>
        </div>

        {showFilters && (
          <div className="p-3 bg-gray-50 rounded-lg mb-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Event Type</label>
                <select
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                >
                  {eventTypes.map(type => (
                    <option key={type.id} value={type.id}>{type.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Distance</label>
                <select
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  value={filterDistance}
                  onChange={(e) => setFilterDistance(e.target.value)}
                >
                  {distanceOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium">Upcoming Events</h3>
          <span className="text-xs text-gray-500">{filteredEvents.length} events found</span>
        </div>

        {filteredEvents.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            <Calendar size={32} className="mx-auto mb-2 text-gray-400" />
            <p>No events found matching your criteria</p>
            <p className="text-sm mt-1">Try adjusting your filters or search query</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredEvents.map(event => (
              <div key={event.id} className="border rounded-lg p-3">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="text-sm font-medium">{event.title}</h4>
                  <span className="bg-blue-50 text-blue-600 text-xs px-2 py-0.5 rounded-full">
                    {event.distance}
                  </span>
                </div>

                <div className="flex flex-wrap text-xs text-gray-600 mb-2">
                  <div className="flex items-center mr-3">
                    <Calendar size={14} className="mr-1 text-green-600" />
                    {event.date}, {event.time}
                  </div>
                  <div className="flex items-center">
                    <MapPin size={14} className="mr-1 text-green-600" />
                    {event.location}
                  </div>
                </div>

                <p className="text-xs text-gray-700 mb-2">{event.description}</p>

                <div className="flex justify-between items-center">
                  <div className="flex items-center text-xs text-gray-600">
                    <Users size={14} className="mr-1" />
                    {typeof event.placesAvailable === 'number'
                      ? `${event.placesAvailable} places available`
                      : event.placesAvailable}
                  </div>
                  <button className="text-xs text-blue-500 flex items-center">
                    Book Place
                    <ChevronRight size={14} className="ml-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="font-medium mb-3">Can't find an event near you?</h3>
        <p className="text-sm text-gray-700 mb-3">
          AHDB regularly organises events across the UK. If you can't find an event in your area, {/* Translate organises */}
          you can register your interest for future events or check out our online webinars.
        </p>
        <div className="flex space-x-2">
          <button className="flex-1 py-2 rounded-lg bg-green-600 text-white text-sm">
            Request an Event
          </button>
          <button className="flex-1 py-2 rounded-lg bg-blue-500 text-white text-sm">
            View Webinars
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventsNearMe;