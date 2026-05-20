import { Suspense } from 'react';
import { Await, useRouteLoaderData } from 'react-router-dom';
import { type Event } from '../types';

import EventItem from '../components/EventItem';
import EventsList from '../components/EventsList';


export default function EventDetailPage() {
    const routeData = useRouteLoaderData<{ event: Event, events: Event[] }>("event-detail");

    if (!routeData) {
        return <p style={{ textAlign: 'center' }}>Loading...</p>
    }

    const { event, events } = routeData;
    return (
        <>
            <EventItem event={event} />
            <h2 style={{ textAlign: 'center' }}>Other Events</h2>
            <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
                <Await resolve={events}>
                    {(loadedEvents) => <EventsList events={loadedEvents} />}
                </Await>
            </Suspense>
        </>
    )
}