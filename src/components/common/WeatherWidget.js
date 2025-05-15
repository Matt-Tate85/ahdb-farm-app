import React, { useState, useEffect } from 'react';
import * as LucideIcons from 'lucide-react'; // Import all icons from lucide-react

// Replace with your actual OpenWeatherMap API key
const API_KEY = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/forecast';

// Helper function to group forecast data by day (same as before)
const groupForecastByDay = (list) => {
  const dailyData = {};
  list.forEach(item => {
    const date = new Date(item.dt * 1000);
    const day = date.toLocaleDateString('en-GB', { weekday: 'short' });
    const dateKey = date.toLocaleDateString('en-GB');

    if (!dailyData[dateKey]) {
      dailyData[dateKey] = {
        day: day,
        temps: [],
        icons: [],
        rain: 0,
        windSpeeds: []
      };
    }

    dailyData[dateKey].temps.push(item.main.temp);
    dailyData[dateKey].icons.push(item.weather[0].icon);
    if (item.rain && item.rain['3h']) {
      dailyData[dateKey].rain += item.rain['3h'];
    }
    dailyData[dateKey].windSpeeds.push(item.wind.speed);
  });

  const processedDailyData = Object.values(dailyData).map(dayData => {
    const avgTemp = dayData.temps.reduce((sum, temp) => sum + temp, 0) / dayData.temps.length;

    const iconCounts = {};
    dayData.icons.forEach(icon => {
      iconCounts[icon] = (iconCounts[icon] || 0) + 1;
    });
    const mostFrequentIcon = Object.keys(iconCounts).reduce((a, b) => iconCounts[a] > iconCounts[b] ? a : b);

    const maxWindSpeed = Math.max(...dayData.windSpeeds);

     const iconMap = {
        '01d': 'Sun', // clear sky day
        '01n': 'Moon', // clear sky night
        '02d': 'CloudSun', // few clouds day
        '02n': 'CloudMoon', // few clouds night
        '03d': 'Cloud', // scattered clouds
        '03n': 'Cloud', // scattered clouds
        '04d': 'Cloudy', // broken clouds day
        '04n': 'Cloudy', // broken clouds night
        '09d': 'CloudRain', // shower rain day
        '09n': 'CloudRain', // shower rain night
        '10d': 'CloudDrizzle', // rain day
        '10n': 'CloudDrizzle', // rain night
        '11d': 'CloudLightning', // thunderstorm day
        '11n': 'CloudLightning', // thunderstorm night
        '13d': 'CloudSnow', // snow day
        '13n': 'CloudSnow', // snow night
        '50d': 'Mist', // mist day
        '50n': 'Mist', // mist night
        // Add more mappings as needed
    };
    // Use 'HelpCircle' as the fallback icon name if the OpenWeatherMap icon is not mapped
    const LucideIconName = iconMap[mostFrequentIcon] || 'HelpCircle';


    return {
      day: dayData.day,
      icon: LucideIconName,
      temp: `${Math.round(avgTemp)}°C`,
      rain: `${dayData.rain.toFixed(1)}mm`,
      wind: `${Math.round(maxWindSpeed * 3.6)} km/h`
    };
  }).slice(0, 5);

  return processedDailyData;
};

/**
 * WeatherWidget Component
 * Displays weather forecast information from a live API feed
 *
 * @param {Object} props - Component props
 * @param {string} props.location - The location for the weather forecast
 */
const WeatherWidget = ({ location = 'Yorkshire' }) => {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${BASE_URL}?q=${location}&appid=${API_KEY}&units=metric`);

        if (!response.ok) {
           const errorBody = await response.text();
           throw new Error(`HTTP error! status: ${response.status} - ${errorBody}`);
        }

        const data = await response.json();

        const dailyForecast = groupForecastByDay(data.list);
        setWeatherData(dailyForecast);

      } catch (error) {
        console.error("Fetching weather failed:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (location && API_KEY) {
      fetchWeather();
    } else if (!API_KEY) {
       console.error("OpenWeatherMap API key is not configured.");
       setError(new Error("API key not configured. Please add REACT_APP_OPENWEATHERMAP_API_KEY to Azure Static Web App configuration."));
       setLoading(false);
    } else {
        setWeatherData([]);
        setLoading(false);
    }
  }, [location]);

  if (loading) {
    return <div className="bg-white rounded-lg shadow p-4">Loading weather...</div>;
  }

  if (error) {
    return <div className="bg-white rounded-lg shadow p-4 text-red-500">Error fetching weather: {error.message}</div>;
  }

  if (!weatherData || weatherData.length === 0) {
      return <div className="bg-white rounded-lg shadow p-4">No weather data available for {location}. Please check the location name.</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="font-medium mb-2">Weather Forecast for {location}</h3>
      <div className="flex justify-between">
        {weatherData.map((day, i) => {
            // Dynamically get the Lucide icon component
            const IconComponent = LucideIcons[day.icon];
             if (!IconComponent) {
                console.warn(`Icon "${day.icon}" not found in LucideIcons. Using HelpCircle as default.`);
                // Fallback to HelpCircle if the mapped icon name is not a valid Lucide icon
                return (
                     <div key={i} className="text-center">
                        <div className="text-xs">{day.day}</div>
                        <div className="my-1">
                           <LucideIcons.HelpCircle size={24} /> {/* Corrected Default icon */}
                        </div>
                        <div className="text-sm font-medium">{day.temp}</div>
                        <div className="text-xs text-blue-500">{day.rain}</div>
                        <div className="text-xs text-gray-700">{day.wind}</div>
                     </div>
                );
            }

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
        Data source: OpenWeatherMap
      </div>
    </div>
  );
};

export default WeatherWidget;
