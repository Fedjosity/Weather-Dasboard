import { Card, CardContent } from "./ui/card";
import type { ForecastItem } from "../types/weather";

export default function ForecastCard({ item }: { item: ForecastItem }) {
  const date = new Date(item.dt * 1000);
  const icon = item.weather?.[0]?.icon;
  const description = item.weather?.[0]?.description;

  return (
    <Card className="glass border-white/20 shadow-glass hover:scale-105 transition-all duration-300 cursor-pointer group">
      <CardContent className="p-4">
        <div className="text-center space-y-3">
          {/* Day */}
          <div className="text-white/90 font-semibold text-sm">
            {date.toLocaleDateString(undefined, { weekday: "short" })}
          </div>

          {/* Weather Icon */}
          {icon && (
            <div className="group-hover:scale-110 transition-transform duration-300">
              <img
                src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                alt={description}
                className="w-12 h-12 mx-auto drop-shadow-md"
              />
            </div>
          )}

          {/* Temperature */}
          <div className="text-2xl font-bold text-white">
            {Math.round(item.main.temp)}°C
          </div>

          {/* Description */}
          <div className="text-xs capitalize text-white/70 leading-tight">
            {description}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
