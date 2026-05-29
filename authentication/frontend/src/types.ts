export type Event = {
    id: string;
    title: string;
    date: string;
    description: string;
    image: string;
}

export type NewEvent = Omit<Event, 'id'>;

export type ValidationErrorResponse = { message: string; errors: { [key: string]: string } };