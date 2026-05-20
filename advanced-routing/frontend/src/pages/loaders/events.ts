import { type LoaderFunctionArgs } from "react-router-dom";

const loadEvents = async () => {
    const resp = await fetch('http://localhost:3000/events');
    if (!resp.ok) {
        throw Response.json({ message: 'Failed to fetch events. Please try again later.' }, { status: 500 });
    } else {
        const data: { events: Event[] } = await resp.json();
        return data.events;
    }
}

const loadEvent = async (id: string) => {
    const resp = await fetch('http://localhost:3000/events/' + id);
    if (!resp.ok) {
        if (resp.status === 404) {
            throw Response.json({ message: 'Could not find event with id: ' + id }, { status: 404 });
        } else {
            throw Response.json({ message: 'Failed to fetch event. Please try again later.' }, { status: 500 });
        }
    } else {
        const data: { event: Event } = await resp.json();
        return data.event;
    }
}

const eventsLoader = () => {
    return {
        events: loadEvents()
    };
}

const eventsDetailLoader = async ({ params }: LoaderFunctionArgs) => {
    const { eventId } = params;

    return {
        events: loadEvents(),
        event: await loadEvent(eventId!)
    }    
}

export { eventsLoader, eventsDetailLoader };