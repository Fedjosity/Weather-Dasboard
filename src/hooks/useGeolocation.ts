import { useEffect, useState } from "react";
import type { Coordinates } from "../types/weather";

export function useGeolocation() {
  const [coords, setCoords] = useState<Coordinates | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      setError("Geolocation is not supported");
      return;
    }

    const watchId = navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ lat: pos.coords.latitude, lon: pos.coords.longitude });
      },
      (err) => {
        setError(err.message || "Failed to get location");
      }
    ) as unknown as number;

    return () => {
      if (watchId && "clearWatch" in navigator.geolocation) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, []);

  return { coords, error };
}
