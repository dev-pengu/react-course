import {Suspense} from "react";
import { useLoaderData, Await } from "react-router-dom";
import EventsList from "../components/EventsList";
import { type Event } from "../types";


export default function EventsPage() {
    const { events } = useLoaderData<{events: Event[]}>();

    return (
        <Suspense fallback={<p style={{textAlign: 'center'}}>Loading...</p>}>    
            <Await resolve={events}>
                {(loadedEvents) => <EventsList events={loadedEvents} />}
            </Await>
        </Suspense>
    )
}