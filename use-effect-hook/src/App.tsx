import { useState, useRef, useEffect, useCallback } from "react";

import DeleteConfirmation from "./components/DeleteConfirmation";
import Modal from "./components/Modal";
import Places from "./components/Places";
import { AVAILABLE_PLACES, type Place } from "./data";
import logoImg from "./assets/logo.png";
import { sortPlacesByDistance } from "./loc";

const storedIds: string[] = JSON.parse(
  localStorage.getItem("selectedPlaces") || "[]",
);
const storedPlaces = storedIds.map(
  (id) => AVAILABLE_PLACES.find((place) => place.id === id)!,
);

function App() {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const selectedPlace = useRef<string>(undefined);
  const [availablePlaces, setAvailablePlaces] = useState<Place[]>([]);
  const [pickedPlaces, setPickedPlaces] = useState<Place[]>(storedPlaces);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setAvailablePlaces(
        sortPlacesByDistance(
          AVAILABLE_PLACES,
          pos.coords.latitude,
          pos.coords.longitude,
        ),
      );
    });
  }, []);

  function handleStartRemovePlace(id: string) {
    setModalIsOpen(true);
    selectedPlace.current = id;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  function handleSelectPlace(id: string) {
    setPickedPlaces((prevPickedPlaces) => {
      if (prevPickedPlaces.some((place) => place.id === id)) {
        return prevPickedPlaces;
      }
      const place = AVAILABLE_PLACES.find((place) => place.id === id);
      return [place!, ...prevPickedPlaces];
    });

    const storedIds: string[] = JSON.parse(
      localStorage.getItem("selectedPlaces") || "[]",
    );
    if (storedIds.indexOf(id) === -1) {
      localStorage.setItem(
        "selectedPlaces",
        JSON.stringify([id, ...storedIds]),
      );
    }
  }

  const handleRemovePlace = useCallback(function handleRemovePlace() {
    setPickedPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current),
    );
    setModalIsOpen(false);

    const storedIds: string[] = JSON.parse(
      localStorage.getItem("selectedPlaces") || "[]",
    );
    localStorage.setItem(
      "selectedPlaces",
      JSON.stringify(storedIds.filter((v) => v !== selectedPlace.current)),
    );
  }, [])

  return (
    <>
      <Modal open={modalIsOpen}>
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
        <Places
          title="I'd like to visit ..."
          fallbackText={"Select the places you would like to visit below."}
          places={pickedPlaces}
          onSelectPlace={handleStartRemovePlace}
        />
        <Places
          title="Available Places"
          places={availablePlaces}
          onSelectPlace={handleSelectPlace}
        />
      </main>
    </>
  );
}

export default App;
