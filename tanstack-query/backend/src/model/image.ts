import mongoose, { Schema } from "mongoose";

export type ImageDocument = {
  path: string;
  caption: string;
};

const imageSchema = new Schema<ImageDocument>(
  {
    path: { type: String, required: true },
    caption: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

const ImageModel = mongoose.model<ImageDocument>("Image", imageSchema);

export default ImageModel;
