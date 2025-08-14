import axios from "axios";
import type {
  Coordinates,
  CurrentWeather,
  ForecastResponse,
  WeatherBundle,
} from "../types/weather";

const API_BASE = "https://api.openweathermap.org/data/2.5";
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY as string;

// Helper function to validate API key
function validateApiKey() {
  if (!API_KEY || API_KEY === "your_api_key_here") {
    throw new Error(
      "API key not configured. Please set VITE_OPENWEATHER_API_KEY in your .env file"
    );
  }
}

export async function fetchCurrentWeatherByCity(
  city: string
): Promise<CurrentWeather> {
  validateApiKey();
  const url = `${API_BASE}/weather`;
  try {
    const { data } = await axios.get<CurrentWeather>(url, {
      params: { q: city, appid: API_KEY, units: "metric" },
    });
    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      throw new Error(
        "Invalid API key. Please check your OpenWeatherMap API key."
      );
    } else if (axios.isAxiosError(error) && error.response?.status === 404) {
      throw new Error(
        "City not found. Please check the spelling and try again."
      );
    } else if (axios.isAxiosError(error) && error.response?.status === 429) {
      throw new Error("API rate limit exceeded. Please try again later.");
    } else {
      throw new Error("Failed to fetch weather data. Please try again.");
    }
  }
}

export async function fetchForecastByCity(
  city: string
): Promise<ForecastResponse> {
  validateApiKey();
  const url = `${API_BASE}/forecast`;
  try {
    const { data } = await axios.get<ForecastResponse>(url, {
      params: { q: city, appid: API_KEY, units: "metric" },
    });
    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      throw new Error(
        "Invalid API key. Please check your OpenWeatherMap API key."
      );
    } else if (axios.isAxiosError(error) && error.response?.status === 404) {
      throw new Error(
        "City not found. Please check the spelling and try again."
      );
    } else if (axios.isAxiosError(error) && error.response?.status === 429) {
      throw new Error("API rate limit exceeded. Please try again later.");
    } else {
      throw new Error("Failed to fetch forecast data. Please try again.");
    }
  }
}

export async function fetchWeatherByCoords(
  coords: Coordinates
): Promise<WeatherBundle> {
  validateApiKey();
  try {
    const [current, forecast] = await Promise.all([
      axios.get<CurrentWeather>(`${API_BASE}/weather`, {
        params: {
          lat: coords.lat,
          lon: coords.lon,
          appid: API_KEY,
          units: "metric",
        },
      }),
      axios.get<ForecastResponse>(`${API_BASE}/forecast`, {
        params: {
          lat: coords.lat,
          lon: coords.lon,
          appid: API_KEY,
          units: "metric",
        },
      }),
    ]);
    return { current: current.data, forecast: forecast.data };
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      throw new Error(
        "Invalid API key. Please check your OpenWeatherMap API key."
      );
    } else if (axios.isAxiosError(error) && error.response?.status === 400) {
      throw new Error("Invalid coordinates provided.");
    } else if (axios.isAxiosError(error) && error.response?.status === 429) {
      throw new Error("API rate limit exceeded. Please try again later.");
    } else {
      throw new Error(
        "Failed to fetch weather data for your location. Please try again."
      );
    }
  }
}
