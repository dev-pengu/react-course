import type { Place } from "./loc";

export const fetchAvailablePlaces = async () => {
  const res = await fetch('http://localhost:3000/places');
  if (!res.ok) {
    throw new Error('Failed to fetch places');
  }
  const resData = await res.json();
  return resData.places;
}

export const fetchUserPlaces = async () => {
  const res = await fetch('http://localhost:3000/user-places');
  if (!res.ok) {
    throw new Error('Failed to fetch user places');
  }
  const resData = await res.json();
  return resData.places;
}

export const savePlaces = async (places: Place[]) => {
  const res = await fetch('http://localhost:3000/user-places', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ places })
  });

  if (!res.ok) {
    throw new Error('Failed to save places');
  }

  const resData = await res.json();
  return resData.message;
}