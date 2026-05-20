import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";
import eventRoutes from './controller/events.js';
import { NotFoundError } from "./util/error.js";

const app = express();

mongoose.connect("mongodb://localhost:27017/advanced-routing");
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use('/events', eventRoutes);

app.use((error: Error | NotFoundError, req: express.Request, res: express.Response, next: express.NextFunction) => {
  const status = error instanceof NotFoundError ? error.status : 500;
  const message = error instanceof Error ? error.message : 'Something went wrong';
  res.status(status).json({message});
});

app.use((req, res) => {
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  res.status(404).json({ message: 'Not found' });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});