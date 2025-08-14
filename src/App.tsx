import { Suspense, lazy, useEffect, useState } from "react";
import "./index.css";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { AlertCircle, Cloud, Sun, Loader2 } from "lucide-react";
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
        setError("Could not find that location. Please try another city.");
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
        setError("Failed to get weather for your location.");
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

  return (
    <div className="min-h-screen weather-gradient relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-white/10 rounded-full">
              <Cloud className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white">
              Weather Dashboard
            </h1>
          </div>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto">
            Get real-time weather updates, forecasts, and temperature trends for
            any location
          </p>
        </header>

        {/* Search Bar */}
        <div className="mb-8">
          <SearchBar
            onSearch={handleSearch}
            onUseLocation={handleUseLocation}
            loading={loading}
          />
        </div>

        {/* Error Display */}
        {error && (
          <Card className="mb-8 bg-red-500/20 border-red-400/40">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 text-red-100">
                <AlertCircle className="h-5 w-5" />
                <span>{error}</span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Geolocation Error */}
        {geoError && !current && (
          <Card className="mb-8 bg-yellow-500/20 border-yellow-400/40">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 text-yellow-100">
                <AlertCircle className="h-5 w-5" />
                <span>
                  Location access denied. Search for a city to get started.
                </span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <Loader2 className="h-12 w-12 animate-spin text-white mx-auto mb-4" />
            <p className="text-white/80 text-lg">Loading weather data...</p>
          </div>
        )}

        {/* Main Content */}
        {!loading && (
          <main className="flex flex-col gap-8 items-center justify-center">
            {current ? (
              <>
                {/* Weather Card and Chart in a row */}
                <div className="flex flex-col lg:flex-row gap-8 w-full">
                  <div className="flex-1">
                    <WeatherCard data={current} />
                  </div>

                  {forecast && (
                    <div className="flex-1">
                      <Suspense
                        fallback={
                          <Card className="glass border-white/20 shadow-glass">
                            <CardContent className="p-8 text-center">
                              <Loader2 className="h-8 w-8 animate-spin text-white mx-auto mb-4" />
                              <p className="text-white/80">Loading chart...</p>
                            </CardContent>
                          </Card>
                        }
                      >
                        <WeatherChart forecast={forecast} />
                      </Suspense>
                    </div>
                  )}
                </div>

                {/* 5-Day Forecast underneath */}
                {forecast && (
                  <div className="w-full">
                    <h3 className="text-2xl font-bold text-white mb-6 text-center">
                      5-Day Forecast
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                      <Suspense
                        fallback={
                          <div className="col-span-full text-center py-8">
                            <Loader2 className="h-8 w-8 animate-spin text-white mx-auto mb-4" />
                            <p className="text-white/80">Loading forecast...</p>
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
                  </div>
                )}
              </>
            ) : (
              <div className="lg:col-span-3 flex flex-col items-center justify-center text-center py-20">
                <Sun className="h-28 w-28 text-yellow-300 mb-6 drop-shadow-lg" />
                <h3 className="text-4xl font-extrabold text-white mb-4">
                  Welcome to Weather Dashboard
                </h3>
                <p className="text-lg md:text-xl text-white/80 font-medium mb-8 max-w-2xl leading-relaxed">
                  Search for a city or use your location to get started with
                  <span className="font-bold">
                    {" "}
                    real-time weather information
                  </span>
                  .
                </p>
                <div className="space-y-3 text-lg text-white/70 font-semibold">
                  <p>• Current temperature & conditions</p>
                  <p>• 5-day weather forecast</p>
                  <p>• Temperature trend charts</p>
                  <p>• Humidity & wind data</p>
                </div>
              </div>
            )}
          </main>
        )}

        {/* Footer */}
        <footer className="mt-16 text-center">
          <div className="glass rounded-2xl p-6 max-w-md mx-auto">
            <p className="text-white/70 mb-2">
              Built with React & OpenWeatherMap API
            </p>
            <div className="flex items-center justify-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                className="text-white/70 hover:text-white hover:bg-white/10"
                asChild
              >
                <a href="https://github.com/" target="_blank" rel="noreferrer">
                  GitHub
                </a>
              </Button>
              <span className="text-white/40">•</span>
              <Button
                variant="ghost"
                size="sm"
                className="text-white/70 hover:text-white hover:bg-white/10"
                asChild
              >
                <a
                  href="https://openweathermap.org/"
                  target="_blank"
                  rel="noreferrer"
                >
                  OpenWeatherMap
                </a>
              </Button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
