import { Suspense, lazy, useEffect, useState } from "react";
import "./index.css";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import type {
  CurrentWeather,
  ForecastResponse,
  WeatherBundle,
} from "./types/weather";
import {
  fetchCurrentWeatherByCity,
  fetchForecastByCity,
  fetchWeatherByCoords,
} from "./services/weatherApi";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useGeolocation } from "./hooks/useGeolocation";

const WeatherChart = lazy(() => import("./components/WeatherChart"));
const ForecastCard = lazy(() => import("./components/ForecastCard"));

function App() {
  const [current, setCurrent] = useLocalStorage<CurrentWeather | null>(
    "current",
    null
  );
  const [forecast, setForecast] = useLocalStorage<ForecastResponse | null>(
    "forecast",
    null
  );
  const [error, setError] = useState<string | null>(null);
  const { coords } = useGeolocation();

  async function handleSearch(city: string) {
    try {
      setError(null);
      const [cw, fc] = await Promise.all([
        fetchCurrentWeatherByCity(city),
        fetchForecastByCity(city),
      ]);
      setCurrent(cw);
      setForecast(fc);
    } catch {
      setError("Could not find that location. Please try another city.");
    }
  }

  async function handleUseLocation() {
    try {
      if (!coords) return;
      setError(null);
      const bundle: WeatherBundle = await fetchWeatherByCoords(coords);
      setCurrent(bundle.current);
      setForecast(bundle.forecast);
    } catch {
      setError("Failed to get weather for your location.");
    }
  }

  useEffect(() => {
    if (!current && coords) {
      handleUseLocation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coords]);

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-700 via-sky-800 to-sky-950 text-white">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-5xl font-bold">Weather Dashboard</h1>
          <p className="text-white/80 mt-2">
            Real-time weather, forecast and trends
          </p>
        </header>

        <SearchBar onSearch={handleSearch} onUseLocation={handleUseLocation} />

        {error && (
          <div className="mt-6 rounded-xl p-4 bg-red-500/20 border border-red-400/40 text-red-100 text-center">
            {error}
          </div>
        )}

        <main className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            {current ? (
              <WeatherCard data={current} />
            ) : (
              <div className="rounded-2xl p-6 bg-white/10 border border-white/20 backdrop-blur text-white/80 text-center">
                Search for a city or use your location to get started.
              </div>
            )}
          </div>

          <div className="md:col-span-2 space-y-6">
            {forecast && (
              <Suspense
                fallback={
                  <div className="rounded-2xl p-6 bg-white/10 border border-white/20 backdrop-blur">
                    Loading chart...
                  </div>
                }
              >
                <WeatherChart forecast={forecast} />
              </Suspense>
            )}

            {forecast && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                <Suspense
                  fallback={
                    <div className="col-span-full text-center">
                      Loading forecast...
                    </div>
                  }
                >
                  {forecast.list
                    .filter((_, idx) => idx % 8 === 0)
                    .slice(0, 5)
                    .map((item) => (
                      <ForecastCard key={item.dt} item={item} />
                    ))}
                </Suspense>
              </div>
            )}
          </div>
        </main>

        <footer className="mt-12 text-center text-white/70">
          <p>
            Built with React & OpenWeatherMap API •
            <a
              className="underline ml-1"
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
