"use client";

import { useEffect, useState } from "react";
import { reverseGeocode } from "../api/location.api";
import { NominatimLocation } from "../types/nominatim.types";

type UseCurrentLocationReturn = {
  location: NominatimLocation | null;
  isLoading: boolean;
  error: string | null;
};

export function useCurrentLocation(): UseCurrentLocationReturn {
  const [location, setLocation] = useState<NominatimLocation | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getLocation() {
      try {
        const position = await new Promise<GeolocationPosition>(
          (resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, {
              enableHighAccuracy: true,
              timeout: 10000,
              maximumAge: 0,
            });
          },
        );

        const location = await reverseGeocode(
          position.coords.latitude,
          position.coords.longitude,
        );

        setLocation(location);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unable to get location");
      } finally {
        setIsLoading(false);
      }
    }

    getLocation();
  }, []);

  return {
    location,
    isLoading,
    error,
  };
}
