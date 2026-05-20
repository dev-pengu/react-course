import { type ActionFunctionArgs, redirect } from "react-router-dom";
import type { ValidationErrorResponse } from "../../types";

const submitEventAction = async ({request, params}: ActionFunctionArgs) => {
    const { eventId } = params;
    const data = await request.formData();
    const eventData = {
        title: data.get("title"),
        date: data.get("date"),
        image: data.get("image"),
        description: data.get("description")
    }
    const url = eventId ? `http://localhost:3000/events/${eventId}` : 'http://localhost:3000/events';
    const resp = await fetch(url, {
        method: request.method,
        body: JSON.stringify(eventData),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (resp.status === 422) {
        const errorData: ValidationErrorResponse = await resp.json();
        return errorData;
    }

    if (!resp.ok) {
        throw Response.json({ message: "Could not save event." }, { status: 500 });
    }

    return redirect('/events');
}

const submitDeleteEventAction = async ({request, params}: ActionFunctionArgs) => {
    const { eventId } = params;
    const url = `http://localhost:3000/events/${eventId}`;
    const resp = await fetch(url, {
        method: request.method
    });

    if (!resp.ok) {
        throw Response.json({ message: "Could not delete event." }, { status: 500 });
    }

    return redirect('/events');
}

export { submitEventAction, submitDeleteEventAction };