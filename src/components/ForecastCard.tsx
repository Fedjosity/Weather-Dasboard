import type { ForecastItem } from "../types/weather";

export default function ForecastCard({ item }: { item: ForecastItem }) {
  const date = new Date(item.dt * 1000);
  const icon = item.weather?.[0]?.icon;
  const description = item.weather?.[0]?.description;

  return (
    <div className="rounded-xl p-4 bg-white/10 border border-white/20 backdrop-blur text-white">
      <div className="text-sm text-white/80">
        {date.toLocaleDateString(undefined, { weekday: "short" })}
      </div>
      <div className="flex items-center gap-2 mt-2">
        {icon && (
          <img
            src={`https://openweathermap.org/img/wn/${icon}.png`}
            alt={description}
            className="w-8 h-8"
          />
        )}
        <div className="text-lg font-semibold">
          {Math.round(item.main.temp)}°C
        </div>
      </div>
      <div className="text-xs capitalize text-white/70">{description}</div>
    </div>
  );
}
