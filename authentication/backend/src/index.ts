import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";
import eventRoutes from "./controller/events.js";
import authRoutes from "./controller/auth.js";
import {
  NotAuthorizedError,
  NotFoundError,
  ValidationError,
  type HTTPError,
  isHttpError,
} from "./util/error.js";

const app = express();

mongoose.connect("mongodb://localhost:27017/advanced-routing");
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS",
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  next();
});

app.use(authRoutes);

app.use("/events", eventRoutes);

app.use(
  (
    error: Error | HTTPError,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    const status = isHttpError(error) ? error.status : 500;
    const message = isHttpError(error) ? error.message : "Something went wrong";
    const body: { [key: string]: any } = {};
    body.message = message;

    if (error instanceof ValidationError) {
      body.errors = error.errors;
    }
    res.status(status).json(body);
  },
);

app.use((req, res) => {
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  res.status(404).json({ message: "Not found" });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
