import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import type { ForecastResponse } from "../types/weather";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
);

type Props = {
  forecast: ForecastResponse;
};

export default function WeatherChart({ forecast }: Props) {
  const labels = forecast.list
    .slice(0, 8 * 5)
    .map((f) =>
      new Date(f.dt * 1000).toLocaleDateString(undefined, { weekday: "short" })
    );
  const temps = forecast.list
    .slice(0, 8 * 5)
    .map((f) => Math.round(f.main.temp));

  return (
    <div className="rounded-2xl p-6 bg-white/10 border border-white/20 backdrop-blur text-white">
      <div className="mb-3 font-semibold">Temperature trend (5 days)</div>
      <Line
        data={{
          labels,
          datasets: [
            {
              label: "Temp °C",
              data: temps,
              borderColor: "rgba(255,255,255,0.9)",
              backgroundColor: "rgba(255,255,255,0.2)",
              tension: 0.3,
            },
          ],
        }}
        options={{
          responsive: true,
          plugins: { legend: { labels: { color: "#fff" } } },
          scales: {
            x: {
              ticks: { color: "#fff" },
              grid: { color: "rgba(255,255,255,0.1)" },
            },
            y: {
              ticks: { color: "#fff" },
              grid: { color: "rgba(255,255,255,0.1)" },
            },
          },
        }}
      />
    </div>
  );
}
