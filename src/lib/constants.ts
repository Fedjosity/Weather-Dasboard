// Weather API constants
export const FORECAST_DAYS = 5;
export const FORECAST_INTERVAL = 8; // 3-hour intervals, so every 8th item is daily

// Loading messages
export const LOADING_MESSAGES = {
  WEATHER_DATA: "Loading weather data...",
  CHART: "Loading chart...",
  FORECAST: "Loading forecast...",
} as const;

// Error messages
export const ERROR_MESSAGES = {
  LOCATION_NOT_FOUND: "Could not find that location. Please try another city.",
  LOCATION_FAILED: "Failed to get weather for your location.",
} as const;
