// src/components/dashboard/WeatherWidget.jsx

import React from 'react';
import { Cloud, CloudRain, Sun, Wind } from 'lucide-react';
import { useDevice } from '../../contexts/DeviceContext';

const WeatherWidget = () => {
  const { isMobile } = useDevice();
  
  // This would normally fetch from a weather API
  const forecastData = [
    { day: 'Today', temp: 18, condition: 'sunny', rain: 0, wind: 5 },
    { day: 'Tomorrow', temp: 16, condition: 'cloudy', rain: 20, wind: 8 },
    { day: 'Wed', temp: 15, condition: 'rainy', rain: 70, wind: 12 },
    { day: 'Thu', temp: 17, condition: 'cloudy', rain: 10, wind: 6 },
    { day: 'Fri', temp: 19, condition: 'sunny', rain: 0, wind: 4 }
  ];
  
  // Display fewer days on mobile
  const displayData = isMobile ? forecastData.slice(0, 3) : forecastData;
  
  const getWeatherIcon = (condition) => {
    switch (condition) {
      case 'sunny': return <Sun size={24} className="text-yellow-500" />;
      case 'cloudy': return <Cloud size={24} className="text-gray-500" />;
      case 'rainy': return <CloudRain size={24} className="text-blue-500" />;
      default: return <Sun size={24} className="text-yellow-500" />;
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="text-base font-medium mb-3">Local Weather</h3>
      
      <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-5 gap-2">
        {displayData.map((day, index) => (
          <div 
            key={index} 
            className="flex flex-col items-center p-2 border border-gray-100 rounded-md"
          >
            <span className="text-sm font-medium mb-1">{day.day}</span>
            <div className="mb-1">{getWeatherIcon(day.condition)}</div>
            <span className="text-lg font-bold mb-1">{day.temp}°C</span>
            <div className="flex items-center text-xs text-gray-500">
              <CloudRain size={12} className="mr-1" />{day.rain}%
            </div>
            <div className="flex items-center text-xs text-gray-500">
              <Wind size={12} className="mr-1" />{day.wind} mph
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-3 pt-2 border-t border-gray-100">
        <div className="flex items-center">
          <div className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full mr-2">
            Good spray window: Tomorrow morning
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
