import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Droplets, Wind } from "lucide-react";
import type { CurrentWeather } from "../types/weather";

type Props = {
  data: CurrentWeather;
};

export default function WeatherCard({ data }: Props) {
  const icon = data.weather?.[0]?.icon;
  const description = data.weather?.[0]?.description;

  return (
    <Card className="glass border-white/20 shadow-glass overflow-hidden">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-3xl font-bold text-white mb-2">
              {data.name}
            </CardTitle>
            <p className="text-white/80 text-lg capitalize">{description}</p>
          </div>
          {icon && (
            <div className="float">
              <img
                src={`https://openweathermap.org/img/wn/${icon}@4x.png`}
                alt={description}
                className="w-24 h-24 drop-shadow-lg"
              />
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-6">
          {/* Main Temperature */}
          <div className="text-center py-4">
            <div className="text-6xl font-bold text-white mb-2">
              {Math.round(data.main.temp)}°C
            </div>
            <div className="text-white/70 text-lg">Current Temperature</div>
          </div>

          {/* Weather Details Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="glass-dark rounded-xl p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Droplets className="h-6 w-6 text-blue-300 mr-2" />
                <span className="text-2xl font-semibold text-white">
                  {data.main.humidity}%
                </span>
              </div>
              <div className="text-white/70 text-sm">Humidity</div>
            </div>

            <div className="glass-dark rounded-xl p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Wind className="h-6 w-6 text-blue-300 mr-2" />
                <span className="text-2xl font-semibold text-white">
                  {Math.round(data.wind.speed)} m/s
                </span>
              </div>
              <div className="text-white/70 text-sm">Wind Speed</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
