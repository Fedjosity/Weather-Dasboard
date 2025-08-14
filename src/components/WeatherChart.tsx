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
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { TrendingUp } from "lucide-react";
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
    <Card className="glass border-white/20 shadow-glass">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-blue-300" />
          <CardTitle className="text-white">
            Temperature Trend (5 Days)
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <Line
          data={{
            labels,
            datasets: [
              {
                label: "Temperature (°C)",
                data: temps,
                borderColor: "rgba(59, 130, 246, 0.8)",
                backgroundColor: "rgba(59, 130, 246, 0.1)",
                borderWidth: 3,
                tension: 0.4,
                pointBackgroundColor: "rgba(59, 130, 246, 1)",
                pointBorderColor: "#ffffff",
                pointBorderWidth: 2,
                pointRadius: 6,
                pointHoverRadius: 8,
                fill: true,
              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                labels: {
                  color: "#ffffff",
                  font: {
                    size: 14,
                    weight: "bold",
                  },
                },
              },
              tooltip: {
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                titleColor: "#ffffff",
                bodyColor: "#ffffff",
                borderColor: "rgba(59, 130, 246, 0.5)",
                borderWidth: 1,
                cornerRadius: 8,
                displayColors: false,
              },
            },
            scales: {
              x: {
                ticks: {
                  color: "#ffffff",
                  font: {
                    size: 12,
                    weight: "normal",
                  },
                },
                grid: {
                  color: "rgba(255, 255, 255, 0.1)",
                },
              },
              y: {
                ticks: {
                  color: "#ffffff",
                  font: {
                    size: 12,
                    weight: "normal",
                  },
                },
                grid: {
                  color: "rgba(255, 255, 255, 0.1)",
                },
              },
            },
            elements: {
              point: {
                hoverBackgroundColor: "rgba(59, 130, 246, 1)",
              },
            },
          }}
          height={300}
        />
      </CardContent>
    </Card>
  );
}
