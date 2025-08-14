import axios from "axios";
import type {
  Coordinates,
  CurrentWeather,
  ForecastResponse,
  WeatherBundle,
} from "../types/weather";

const API_BASE = "https://api.openweathermap.org/data/2.5";
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY as string;

export async function fetchCurrentWeatherByCity(
  city: string
): Promise<CurrentWeather> {
  const url = `${API_BASE}/weather`;
  const { data } = await axios.get<CurrentWeather>(url, {
    params: { q: city, appid: API_KEY, units: "metric" },
  });
  return data;
}

export async function fetchForecastByCity(
  city: string
): Promise<ForecastResponse> {
  const url = `${API_BASE}/forecast`;
  const { data } = await axios.get<ForecastResponse>(url, {
    params: { q: city, appid: API_KEY, units: "metric" },
  });
  return data;
}

export async function fetchWeatherByCoords(
  coords: Coordinates
): Promise<WeatherBundle> {
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
}
