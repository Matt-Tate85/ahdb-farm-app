import React from 'react';
import * as LucideIcons from 'lucide-react';
import { SAMPLE_WEATHER_FORECAST, COLORS } from '../../utils/constants';

/**
 * WeatherWidget Component
 * Displays weather forecast information
 * 
 * @param {Object} props - Component props
 * @param {string} props.location - The location for the weather forecast
 */
const WeatherWidget = ({ location = 'Yorkshire' }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="font-medium mb-2">Weather Forecast for {location}</h3>
      <div className="flex justify-between">
        {SAMPLE_WEATHER_FORECAST.map((day, i) => {
          const IconComponent = LucideIcons[day.icon];
          return (
            <div key={i} className="text-center">
              <div className="text-xs">{day.day}</div>
              <div className="my-1">
                <IconComponent size={24} />
              </div>
              <div className="text-sm font-medium">{day.temp}</div>
              <div className="text-xs text-blue-500">{day.rain}</div>
              <div className="text-xs text-gray-700">{day.wind}</div>
            </div>
          );
        })}
      </div>
      <div className="mt-2 text-xs text-center text-gray-700">
        Data source: Met Office
      </div>
    </div>
  );
};

export default WeatherWidget;
