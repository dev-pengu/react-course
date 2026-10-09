export type Event = {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image: string;
};

export type EventFormData = Omit<Event, "id">;

export type Image = {
  path: string;
  caption: string;
};

export type APIInfo = {
  message: string;
};
