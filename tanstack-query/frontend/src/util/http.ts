import { type QueryFunctionContext, QueryClient } from "@tanstack/react-query";
import type { APIInfo, Event, EventFormData, Image } from "../types.js";
import { HttpError } from "./error.js";

const queryClient = new QueryClient();

async function fetchEvents({
  searchTerm,
  signal,
  max,
}: QueryFunctionContext & {
  searchTerm?: string;
  max?: number;
}): Promise<Event[]> {
  let url = "http://localhost:3000/events";
  if (searchTerm && max) {
    url += `?search=${encodeURIComponent(searchTerm)}&max=${max}`;
  } else if (searchTerm) {
    url += `?search=${encodeURIComponent(searchTerm)}`;
  } else if (max) {
    url += `?max=${max}`;
  }

  const response = await fetch(url, { signal });

  if (!response.ok) {
    const error = new HttpError(
      "An error occurred while fetching the events",
      response.status,
      await response.json(),
    );
    throw error;
  }

  const { events } = await response.json();

  return events;
}

const submitEvent = async (
  eventData: EventFormData | Event,
): Promise<Event> => {
  let url = "http://localhost:3000/events";
  let method = "POST";
  if ("id" in eventData) {
    method = "PATCH";
    url += `/${eventData.id}`;
  }
  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ event: eventData }),
  });

  if (!response.ok) {
    const error = new HttpError(
      "An error occurred while submitting the event",
      response.status,
      await response.json(),
    );
    throw error;
  }

  const { event } = await response.json();

  return event;
};

const fetchEvent = async ({
  id,
  signal,
}: QueryFunctionContext & { id: string }): Promise<Event> => {
  const response = await fetch(`http://localhost:3000/events/${id}`, {
    signal,
  });

  if (!response.ok) {
    const error = new HttpError(
      "An error occurred while fetching the event",
      response.status,
      await response.json(),
    );
    throw error;
  }

  const { event } = await response.json();

  return event;
};

const updateEvent = async ({
  id,
  event,
}: {
  id: string;
  event: EventFormData | Event;
}): Promise<Event> => {
  const response = await fetch(`http://localhost:3000/events/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ event }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error = new HttpError(
      "An error occurred while updating the event",
      response.status,
      await response.json(),
    );
    throw error;
  }
  const { event: updatedEvent } = await response.json();
  return updatedEvent;
};

const deleteEvent = async ({ id }: { id: string }): Promise<APIInfo> => {
  const response = await fetch(`http://localhost:3000/events/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const error = new HttpError(
      "An error occurred while deleting the event",
      response.status,
      await response.json(),
    );
    throw error;
  }

  return response.json();
};

const fetchImages = async (): Promise<Image[]> => {
  const response = await fetch("http://localhost:3000/events/images");

  if (!response.ok) {
    const error = new HttpError(
      "An error occurred while fetching the images",
      response.status,
      await response.json(),
    );
    throw error;
  }

  const { images } = await response.json();

  return images;
};

export {
  fetchEvents,
  submitEvent,
  fetchImages,
  fetchEvent,
  updateEvent,
  deleteEvent,
  queryClient,
};
