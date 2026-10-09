import { v4 as uuidv4 } from "uuid";
import express from "express";
import EventModel, { type EventDocument } from "../model/event.js";
import ImageModel from "../model/image.js";

const router = express.Router();

type EventPayload = Omit<EventDocument, "id"> & { id?: string };

router.get("/", async (req, res, next) => {
  const { max, search } = req.query;

  try {
    const query = EventModel.find();
    query.setOptions({ lean: true });

    if (search && typeof search === "string") {
      query.or([
        { title: new RegExp(search, "i") },
        { description: new RegExp(search, "i") },
        { location: new RegExp(search, "i") },
      ]);
    }

    if (max) {
      query.limit(Number(max));
    }

    const events = await query.exec();
    res.json({ events });
  } catch (error) {
    next(error);
  }
});

router.get("/images", async (req, res, next) => {
  try {
    const images = await ImageModel.find().lean();
    res.json({ images });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const event = await EventModel.findOne({ id }).lean();

    if (!event) {
      return res
        .status(404)
        .json({ message: "Event not found with id: " + id });
    }

    setTimeout(() => {
      res.json({ event });
    }, 1000);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  const { event }: { event: EventPayload } = req.body;

  if (!event) {
    return res.status(400).json({ message: "Event data is required." });
  }

  if (
    !event.title?.trim() ||
    !event.description?.trim() ||
    !event.location?.trim() ||
    !event.date ||
    !event.time?.trim() ||
    !event.image?.trim()
  ) {
    return res.status(400).json({ message: "All event fields are required." });
  }

  try {
    const newEvent = new EventModel({ ...event, id: uuidv4() });
    await newEvent.save();
    res.status(201).json({ event: newEvent });
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { event }: { event: EventPayload } = req.body;

  if (!event) {
    return res.status(400).json({ message: "Event data is required." });
  }

  if (
    !event.title?.trim() ||
    !event.description?.trim() ||
    !event.location?.trim() ||
    !event.date ||
    !event.time?.trim() ||
    !event.image?.trim()
  ) {
    return res.status(400).json({ message: "All event fields are required." });
  }

  try {
    const updatedEvent = await EventModel.findOneAndUpdate(
      { id },
      { ...event, id },
      { new: true },
    ).lean();

    if (!updatedEvent) {
      return res
        .status(404)
        .json({ message: "Event not found with id: " + id });
    }

    res.json({ event: updatedEvent });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedEvent = await EventModel.findOneAndDelete({ id }).lean();

    if (!deletedEvent) {
      return res
        .status(404)
        .json({ message: "Event not found with id: " + id });
    }

    res.json({ message: "Event deleted successfully." });
  } catch (error) {
    next(error);
  }
});

export default router;
