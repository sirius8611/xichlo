
import { useState, useEffect } from 'react';

interface LocationState {
  latitude: number | null;
  longitude: number | null;
  error: string | null;
  loading: boolean;
}

export const useLocation = () => {
  const [location, setLocation] = useState<LocationState>({
    latitude: null,
    longitude: null,
    error: null,
    loading: true
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocation({
        ...location,
        error: "Geolocation is not supported by your browser",
        loading: false
      });
      return;
    }

    const success = (position: GeolocationPosition) => {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        error: null,
        loading: false
      });
    };

    const error = () => {
      setLocation({
        ...location,
        error: "Unable to retrieve your location",
        loading: false
      });
    };

    // For development, we'll set a default location to Hanoi if permission is denied
    const setupFallbackLocation = () => {
      // Hanoi coordinates
      setLocation({
        latitude: 21.0278,
        longitude: 105.8342,
        error: "Using default location (Hanoi)",
        loading: false
      });
    };

    navigator.geolocation.getCurrentPosition(success, error);

    // Fallback setTimeout in case permission dialog gets stuck
    const timeoutId = setTimeout(setupFallbackLocation, 5000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return location;
};
