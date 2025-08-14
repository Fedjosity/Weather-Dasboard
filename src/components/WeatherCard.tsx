import type { CurrentWeather } from "../types/weather";

type Props = {
  data: CurrentWeather;
};

export default function WeatherCard({ data }: Props) {
  const icon = data.weather?.[0]?.icon;
  const description = data.weather?.[0]?.description;

  return (
    <div className="rounded-2xl p-6 bg-white/10 border border-white/20 backdrop-blur shadow-glass text-white">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">{data.name}</h2>
          <p className="capitalize text-white/80">{description}</p>
        </div>
        {icon && (
          <img
            src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
            alt={description}
            className="w-16 h-16"
          />
        )}
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4">
        <div>
          <div className="text-4xl font-bold">
            {Math.round(data.main.temp)}°C
          </div>
          <div className="text-sm text-white/70">Temperature</div>
        </div>
        <div>
          <div className="text-2xl font-semibold">{data.main.humidity}%</div>
          <div className="text-sm text-white/70">Humidity</div>
        </div>
        <div>
          <div className="text-2xl font-semibold">
            {Math.round(data.wind.speed)} m/s
          </div>
          <div className="text-sm text-white/70">Wind</div>
        </div>
      </div>
    </div>
  );
}
