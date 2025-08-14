import { useEffect, useState } from "react";
import type {
  CurrentWeather,
  ForecastResponse,
  WeatherBundle,
} from "../types/weather";
import {
  fetchCurrentWeatherByCity,
  fetchForecastByCity,
  fetchWeatherByCoords,
} from "../services/weatherApi";
import { useLocalStorage } from "./useLocalStorage";
import { useGeolocation } from "./useGeolocation";
import { ERROR_MESSAGES } from "../lib/constants";

export function useWeather() {
  const [current, setCurrent] = useLocalStorage<CurrentWeather | null>(
    "current",
    null
  );
  const [forecast, setForecast] = useLocalStorage<ForecastResponse | null>(
    "forecast",
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { coords, error: geoError, loading: geoLoading } = useGeolocation();

  async function handleSearch(city: string) {
    try {
      setError(null);
      setLoading(true);
      const [cw, fc] = await Promise.all([
        fetchCurrentWeatherByCity(city),
        fetchForecastByCity(city),
      ]);
      setCurrent(cw);
      setForecast(fc);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError(ERROR_MESSAGES.LOCATION_NOT_FOUND);
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleUseLocation() {
    try {
      if (!coords) return;
      setError(null);
      setLoading(true);
      const bundle: WeatherBundle = await fetchWeatherByCoords(coords);
      setCurrent(bundle.current);
      setForecast(bundle.forecast);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError(ERROR_MESSAGES.LOCATION_FAILED);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!current && coords && !geoLoading) {
      handleUseLocation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coords, geoLoading]);

  return {
    current,
    forecast,
    error,
    loading,
    geoError,
    geoLoading,
    handleSearch,
    handleUseLocation,
  };
}
