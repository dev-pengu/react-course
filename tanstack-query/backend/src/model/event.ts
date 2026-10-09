import mongoose, { Schema } from "mongoose";

export type EventDocument = {
  id: string;
  title: string;
  description: string;
  date: Date;
  time: string;
  location: string;
  image: string;
};

const eventSchema = new Schema<EventDocument>(
  {
    id: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    location: { type: String, required: true },
    image: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

const EventModel = mongoose.model<EventDocument>("Event", eventSchema);

export default EventModel;
