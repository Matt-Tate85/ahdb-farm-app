import React, { useState, useEffect } from 'react';
import * as LucideIcons from 'lucide-react';

// Replace with your actual OpenWeatherMap API key
const API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/forecast';

// Helper function to group forecast data by day
const groupForecastByDay = (list) => {
  const dailyData = {};
  list.forEach(item => {
    const date = new Date(item.dt * 1000);
    const day = date.toLocaleDateString('en-GB', { weekday: 'short' }); // Get short day name (e.g., Mon)
    const dateKey = date.toLocaleDateString('en-GB'); // Use date as a key for grouping

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
    // OpenWeatherMap reports rain in the last 3 hours
    if (item.rain && item.rain['3h']) {
      dailyData[dateKey].rain += item.rain['3h'];
    }
    dailyData[dateKey].windSpeeds.push(item.wind.speed);
  });

  // Process grouped data to get a single value per day
  const processedDailyData = Object.values(dailyData).map(dayData => {
    const avgTemp = dayData.temps.reduce((sum, temp) => sum + temp, 0) / dayData.temps.length;

    // Determine the most frequent icon for the day
    const iconCounts = {};
    dayData.icons.forEach(icon => {
      iconCounts[icon] = (iconCounts[icon] || 0) + 1;
    });
    const mostFrequentIcon = Object.keys(iconCounts).reduce((a, b) => iconCounts[a] > iconCounts[b] ? a : b);

    const maxWindSpeed = Math.max(...dayData.windSpeeds);

    // Map OpenWeatherMap icon codes to lucide-react icon names (you might need to expand this mapping)
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
    };

    const LucideIconName = iconMap[mostFrequentIcon] || 'QuestionMarkCircle'; // Default icon if not mapped

    return {
      day: dayData.day,
      icon: LucideIconName,
      temp: `${Math.round(avgTemp)}°C`, // Assuming Celsius, adjust units parameter in API call if needed
      rain: `${dayData.rain.toFixed(1)}mm`,
      wind: `${Math.round(maxWindSpeed * 3.6)} km/h` // Convert m/s to km/h
    };
  }).slice(0, 5); // Take the next 5 days

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
        const response = await fetch(`${BASE_URL}?q=${location}&appid=${API_KEY}&units=metric`); // units=metric for Celsius

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Process the 5-day forecast data (3-hour intervals) into daily data
        const dailyForecast = groupForecastByDay(data.list);
        setWeatherData(dailyForecast);

      } catch (error) {
        console.error("Fetching weather failed:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (location && API_KEY && API_KEY !== 'YOUR_OPENWEATHERMAP_API_KEY') {
      fetchWeather();
    } else {
        if (!API_KEY || API_KEY === 'YOUR_OPENWEATHERMAP_API_KEY') {
            console.error("OpenWeatherMap API key not provided or is the placeholder.");
            setError(new Error("API key not configured."));
        } else {
             setWeatherData([]); // Clear data if location is not provided
             setLoading(false);
        }
    }
  }, [location]); // Rerun effect if location changes

  if (loading) {
    return <div className="bg-white rounded-lg shadow p-4">Loading weather...</div>;
  }

  if (error) {
    return <div className="bg-white rounded-lg shadow p-4 text-red-500">Error fetching weather: {error.message}</div>;
  }

  if (!weatherData || weatherData.length === 0) {
      return <div className="bg-white rounded-lg shadow p-4">No weather data available for {location}.</div>;
  }


  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="font-medium mb-2">Weather Forecast for {location}</h3>
      <div className="flex justify-between">
        {weatherData.map((day, i) => {
            // Dynamically get the Lucide icon component
            const IconComponent = LucideIcons[day.icon];
             if (!IconComponent) {
                console.warn(`Icon "${day.icon}" not found in LucideIcons. Using a default.`);
                // Fallback to a default icon if the mapped icon name is not a valid Lucide icon
                return (
                     <div key={i} className="text-center">
                        <div className="text-xs">{day.day}</div>
                        <div className="my-1">
                           <LucideIcons.QuestionMarkCircle size={24} /> {/* Default icon */}
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
