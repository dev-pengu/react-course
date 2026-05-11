import { sortPlacesByDistance, type Place } from '../loc';
import Places from './Places';
import ErrorComponent from './Error';
import { fetchAvailablePlaces } from '../http';
import useFetch from '../hooks/useFetch';

async function fetchSortedPlaces() {
  const places: Place[] = await fetchAvailablePlaces();
  
  return new Promise<Place[]>((resolve) => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const sortedPlaces = sortPlacesByDistance(places, pos.coords.latitude, pos.coords.longitude);
      resolve(sortedPlaces);
    }, () => {
      resolve(places);
    });
  });
}

export default function AvailablePlaces({ onSelectPlace }: { onSelectPlace: (place: Place) => void }) {

  const [isFetching, error, places] = useFetch<Place[]>(fetchSortedPlaces, []);

  if (error) {
    return (<ErrorComponent title="An error occurred!" message={error.message ?? 'An unknown error occurred'} />);
  }

  return (
    <Places
      title="Available Places"
      places={places!}
      isLoading={isFetching}
      loadingText="Loading places..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}