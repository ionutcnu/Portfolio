// GET endpoint for weather data with caching
export const dynamic = 'force-dynamic';

import { getCloudflareContext } from '@opennextjs/cloudflare';

const LOCATION = 'Bucharest';
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes in milliseconds

let cachedWeather: {
  data: WeatherData;
  timestamp: number;
} | null = null;

interface WeatherData {
  location: string;
  temp: number;
  condition: string;
  icon: string;
}

export async function GET() {
  try {
    // Get API key from environment
    const env = getCloudflareContext().env;
    const WEATHER_API_KEY = env.WEATHER_API_KEY as string;

    if (!WEATHER_API_KEY) {
      throw new Error('WEATHER_API_KEY not configured');
    }

    // Return cached data if still valid
    if (cachedWeather && Date.now() - cachedWeather.timestamp < CACHE_DURATION) {
      return Response.json(cachedWeather.data);
    }

    // Fetch fresh weather data
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${LOCATION}&aqi=no`
    );

    if (!response.ok) {
      throw new Error('Weather API request failed');
    }

    const data = await response.json() as {
      location: { name: string };
      current: {
        temp_c: number;
        condition: { text: string; code: number };
        is_day: number;
      };
    };

    const weatherData: WeatherData = {
      location: data.location.name,
      temp: Math.round(data.current.temp_c),
      condition: data.current.condition.text,
      icon: getWeatherEmoji(data.current.condition.code, data.current.is_day),
    };

    // Cache the result
    cachedWeather = {
      data: weatherData,
      timestamp: Date.now(),
    };

    return Response.json(weatherData);
  } catch (error) {
    console.error('Failed to fetch weather:', error);
    return Response.json(
      {
        location: 'Bucharest',
        temp: '--',
        condition: 'Unavailable',
        icon: '🌡️',
      },
      { status: 200 } // Return fallback data instead of error
    );
  }
}

// Map WeatherAPI condition codes to emojis
function getWeatherEmoji(code: number, isDay: number): string {
  // Sunny/Clear
  if (code === 1000) return isDay ? '☀️' : '🌙';

  // Partly cloudy
  if (code === 1003) return isDay ? '⛅' : '☁️';

  // Cloudy/Overcast
  if (code === 1006 || code === 1009) return '☁️';

  // Fog/Mist
  if (code >= 1030 && code <= 1147) return '🌫️';

  // Rain
  if ((code >= 1063 && code <= 1072) || (code >= 1150 && code <= 1201)) return '🌧️';

  // Snow
  if ((code >= 1066 && code <= 1117) || (code >= 1210 && code <= 1282)) return '❄️';

  // Thunderstorm
  if (code >= 1273 && code <= 1282) return '⛈️';

  // Default
  return '🌡️';
}
