import express from 'express';
import EventModel from '../model/event.js';
import { isValidText, isValidDate, isValidUrl } from '../util/validation.js';
import { v4 as uuidv4 } from 'uuid';
import { NotFoundError } from '../util/error.js';

const router = express.Router();

type EventPayload = {
    id?: string;
    title: string;
    description: string;
    date: string;
    image: string;
}

router.get('/', async (req, res, next) => {
    try {
        const events = await EventModel.find().sort({ date: 'desc'}).lean();
        setTimeout(() => {
            return res.status(200).json({ events });
        }, 2000);
    } catch (error: unknown) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    const { id } = req.params;

    try {
        const event = await EventModel.findOne({ id }).lean();

        if (!event) {
            throw new NotFoundError('Event not found with id: ' + id);
        }

        return res.status(200).json({ event });
    } catch (error: unknown) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    const { id, title, description, date, image } = req.body as EventPayload;

    let errors: { [key: string]: string } = {};

    if (!isValidText(title)) {
        errors.title = 'Invalid title.';
    }

    if (!isValidText(description)) {
        errors.description = 'Invalid description.';
    }

    if (!isValidDate(date)) {
        errors.date = 'Invalid date.';
    }

    if (!isValidUrl(image)) {
        errors.image = 'Invalid image URL.';
    }

    if (Object.keys(errors).length > 0) {
        return res.status(422).json({ message: 'Validation failed', errors });
    }

    try {
        const newEvent = new EventModel({
            id: id ?? uuidv4(),
            title,
            description,
            date: new Date(date),
            image,
        });

        await newEvent.save();
        setTimeout(() => {
            return res.status(201).json({ event: newEvent });
        }, 1500);
    } catch (error: unknown) {
        next(error);
    }
});

router.patch('/:id', async (req, res, next) => {
    const { id } = req.params;
    const { title, description, date, image } = req.body as Partial<EventPayload>;

    let errors: { [key: string]: string } = {};

    if (title !== undefined && !isValidText(title)) {
        errors.title = 'Invalid title.';
    }

    if (description !== undefined && !isValidText(description)) {
        errors.description = 'Invalid description.';
    }

    if (date !== undefined && !isValidDate(date)) {
        errors.date = 'Invalid date.';
    }

    if (image !== undefined && !isValidUrl(image)) {
        errors.image = 'Invalid image URL.';
    }

    if (Object.keys(errors).length > 0) {
        return res.status(422).json({ message: 'Validation failed', errors });
    }

    try {
        const event = await EventModel.findOne({ id });

        if (!event) {
            throw new NotFoundError('Event not found with id: ' + id);
        }

        if (title !== undefined) {
            event.title = title;
        }
        if (description !== undefined) {
            event.description = description;
        }
        if (date !== undefined) {
            event.date = new Date(date);
        }
        if (image !== undefined) {
            event.image = image;
        }

        await event.save();
        return res.status(200).json({ event });
    } catch (error: unknown) {
        next(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    const { id } = req.params;

    try {
        const deletedEvent = await EventModel.findOneAndDelete({ id });

        if (!deletedEvent) {
            throw new NotFoundError('Event not found with id: ' + id);
        }

        return res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error: unknown) {
        next(error);
    }
});

export default router;