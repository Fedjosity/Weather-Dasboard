import { Suspense, lazy } from "react";
import { Card, CardContent } from "./ui/card";
import { Loader2 } from "lucide-react";
import WeatherCard from "./WeatherCard";
import type { CurrentWeather, ForecastResponse } from "../types/weather";
import {
  FORECAST_DAYS,
  FORECAST_INTERVAL,
  LOADING_MESSAGES,
} from "../lib/constants";

const WeatherChart = lazy(() => import("./WeatherChart"));
const ForecastCard = lazy(() => import("./ForecastCard"));

type Props = {
  current: CurrentWeather;
  forecast: ForecastResponse | null;
};

export default function WeatherLayout({ current, forecast }: Props) {
  return (
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
                    <p className="text-white/80">{LOADING_MESSAGES.CHART}</p>
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
                  <p className="text-white/80">{LOADING_MESSAGES.FORECAST}</p>
                </div>
              }
            >
              {forecast.list
                .filter((_, idx) => idx % FORECAST_INTERVAL === 0)
                .slice(0, FORECAST_DAYS)
                .map((item) => (
                  <ForecastCard key={item.dt} item={item} />
                ))}
            </Suspense>
          </div>
        </div>
      )}
    </>
  );
}
