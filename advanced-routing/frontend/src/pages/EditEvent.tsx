import { useRouteLoaderData } from "react-router-dom";
import { type Event } from "../types";

import EventForm from "../components/EventForm";


export default function EditEventPage() {
    const event = useRouteLoaderData<Event>("event-detail");
    console.log(event);
    return (
        <>
            <EventForm method="patch" event={event} />
        </>
    )
}