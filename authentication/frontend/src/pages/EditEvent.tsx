import { useRouteLoaderData } from "react-router-dom";
import { type Event } from "../types";

import EventForm from "../components/EventForm";


export default function EditEventPage() {
    const data = useRouteLoaderData<{ event: Event, events: Event[] }>("event-detail");
    const event = data?.event;
    return (
        <>
            <EventForm method="patch" event={event} />
        </>
    )
}