import { useEffect, useState } from 'react';
import { sortPlacesByDistance, type Place } from '../loc';
import Places from './Places';
import ErrorComponent from './Error';
import { fetchAvailablePlaces } from '../http';

export default function AvailablePlaces({ onSelectPlace }: { onSelectPlace: (place: Place) => void }) {
  const [places, setPlaces] = useState<Place[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPlaces = async () => {
      setIsFetching(true);
      try {
        const places: Place[] = await fetchAvailablePlaces();

        navigator.geolocation.getCurrentPosition((pos) => {
          const sortedPlaces = sortPlacesByDistance(places, pos.coords.latitude, pos.coords.longitude);
          setPlaces(sortedPlaces);
          setIsFetching(false);
        }, () => {
          setPlaces(places);
          setIsFetching(false);
        });

        
      } catch (error: Error | unknown) {
        if (error instanceof Error) {
          setError(error);
        } else {
          setError(new Error('An unknown error occurred'));
        }
        setIsFetching(false);
      }
    }

    fetchPlaces();
  }, []);

  if (error) {
    return (<ErrorComponent title="An error occurred!" message={error.message ?? 'An unknown error occurred'} />);
  }

  return (
    <Places
      title="Available Places"
      places={places}
      isLoading={isFetching}
      loadingText="Loading places..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}