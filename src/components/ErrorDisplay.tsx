import { AlertCircle } from "lucide-react";
import { Card, CardContent } from "./ui/card";

type Props = {
  error: string | null;
  geoError: string | null;
  hasCurrentWeather: boolean;
};

export default function ErrorDisplay({
  error,
  geoError,
  hasCurrentWeather,
}: Props) {
  return (
    <>
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
      {geoError && !hasCurrentWeather && (
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
    </>
  );
}
