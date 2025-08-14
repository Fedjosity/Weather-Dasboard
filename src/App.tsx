import "./index.css";
import SearchBar from "./components/SearchBar";
import Header from "./components/Header";
import ErrorDisplay from "./components/ErrorDisplay";
import LoadingSpinner from "./components/LoadingSpinner";
import WelcomeScreen from "./components/WelcomeScreen";
import WeatherLayout from "./components/WeatherLayout";
import Footer from "./components/Footer";
import Background from "./components/Background";
import { useWeather } from "./hooks/useWeather";
import { LOADING_MESSAGES } from "./lib/constants";

function App() {
  const {
    current,
    forecast,
    error,
    loading,
    geoError,
    handleSearch,
    handleUseLocation,
  } = useWeather();

  return (
    <div className="min-h-screen weather-gradient relative overflow-hidden">
      <Background />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        <Header />

        <div className="mb-8">
          <SearchBar
            onSearch={handleSearch}
            onUseLocation={handleUseLocation}
            loading={loading}
          />
        </div>

        <ErrorDisplay
          error={error}
          geoError={geoError}
          hasCurrentWeather={!!current}
        />

        {loading && <LoadingSpinner message={LOADING_MESSAGES.WEATHER_DATA} />}

        {!loading && (
          <main className="flex flex-col gap-8 items-center justify-center">
            {current ? (
              <WeatherLayout current={current} forecast={forecast} />
            ) : (
              <WelcomeScreen />
            )}
          </main>
        )}

        <Footer />
      </div>
    </div>
  );
}

export default App;
