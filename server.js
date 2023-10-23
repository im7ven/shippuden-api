const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const Character = require("./models/character"); // Import the Character model

const app = express();
app.use(cors());
const port = process.env.PORT || 3000;

// Establish MongoDB connection using Mongoose
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const dbConnection = mongoose.connection;

dbConnection.on(
  "error",
  console.error.bind(console, "MongoDB connection error:")
);
dbConnection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
});

// Middleware to parse JSON requests
app.use(express.json());

// API endpoint to get characters
app.get("/characters", async (req, res) => {
  try {
    const characters = await Character.find(); // Use the Mongoose model to query the characters
    res
      .status(200)
      .json({ status: "success", amount: characters.length, data: characters });
  } catch (err) {
    console.error("Error fetching characters:", err);
    res
      .status(500)
      .json({ status: "failed", message: "Internal Server Error" });
  }
});
