import mongoose from "mongoose";
import fs from "node:fs/promises";

mongoose.connect("mongodb://localhost:27017/tanstack-query");
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");

  // Seed the database with some initial data
  const seedData = async () => {
    const eventsFileContent = await fs.readFile("./data/events.json", "utf-8");
    const events = JSON.parse(eventsFileContent);
    await mongoose.connection.db.collection("events").insertMany(events);
    const imageFileContent = await fs.readFile("./data/images.json", "utf-8");
    const images = JSON.parse(imageFileContent);
    await mongoose.connection.db.collection("images").insertMany(images);
    console.log("Database seeded with initial data");
  };

  seedData()
    .then(() => {
      console.log("Data seeding completed");
      mongoose.connection.close();
      +process.exit(0);
    })
    .catch((error) => {
      console.error("Error seeding database:", error);
      mongoose.connection.close();
      process.exit(1);
    });
});
