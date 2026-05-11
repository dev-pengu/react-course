import { useRef, useState, useCallback } from 'react';

import logoImg from './assets/logo.png';
import AvailablePlaces from './components/AvailablePlaces';
import Places from './components/Places';
import Modal from './components/Modal';
import DeleteConfirmation from './components/DeleteConfirmation';
import ErrorComponent from './components/Error';
import type { Place } from './loc';
import { fetchUserPlaces, savePlaces } from './http';
import useFetch from './hooks/useFetch';


function App() {
  
  const selectedPlace = useRef<Place | null>(null);

  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [updateError, setUpdateError] = useState<Error | null>(null);

  const [isFetching, error, fetchedData, setFetchedData] = useFetch<Place[]>(fetchUserPlaces, []);


  function handleStartRemovePlace(place: Place) {
    setModalIsOpen(true);
    selectedPlace.current = place;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  async function handleSelectPlace(selectedPlace: Place) {
    setFetchedData((prevPickedPlaces) => {
      if (!prevPickedPlaces) {
        prevPickedPlaces = [];
      }
      if (prevPickedPlaces.some((place) => place.id === selectedPlace.id)) {
        return prevPickedPlaces;
      }
      return [selectedPlace, ...prevPickedPlaces];
    });

    try {
      await savePlaces([selectedPlace, ...fetchedData!]);
    } catch (error: unknown) {
      console.error('Error saving places:', error);
      setFetchedData(fetchedData);
      if (error instanceof Error) {
        setUpdateError(error);
      } else {
        setUpdateError(new Error('Failed to add the place. Please try again.'));
      }
    }
  }

  const handleRemovePlace = useCallback(async function handleRemovePlace() {
    setFetchedData((prevPickedPlaces) =>
      prevPickedPlaces!.filter((place) => place.id !== selectedPlace.current?.id)
    );

    try {
      await savePlaces(fetchedData!.filter((place) => place.id !== selectedPlace.current?.id));
    } catch (error: Error | unknown) {
      setFetchedData(fetchedData);
      if (error instanceof Error) {
        setUpdateError(error);
      } else {
        setUpdateError(new Error('Failed to remove the place. Please try again.'));
      }
    }

    setModalIsOpen(false);
  }, [fetchedData, setFetchedData]);

  return (
    <>
      <Modal open={updateError !== null} onClose={() => setUpdateError(null)}>
        <ErrorComponent title="An Error occurred!" message={updateError?.message ?? 'An unknown error occurred'} onConfirm={() => setUpdateError(null)} />
      </Modal>
      <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        { error ? <ErrorComponent title="An Error occurred!" message={error.message ?? 'An unknown error occurred'} />
         : <Places
          title="I'd like to visit ..."
          isLoading={isFetching}
          loadingText="Loading user saved places..."
          fallbackText="Select the places you would like to visit below."
          places={fetchedData!}
          onSelectPlace={handleStartRemovePlace}
        />
        }

        <AvailablePlaces onSelectPlace={handleSelectPlace} />
      </main>
    </>
  );
}

export default App
