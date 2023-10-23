const express = require("express");
const cors = require("cors");
const { connectToDb, getDb } = require("./db");

// init app & middleware
const app = express();
app.use(cors());
const port = process.env.PORT || 3000;

// Db connection
let db;

connectToDb((err) => {
  if (!err) {
    app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
    db = getDb();
  } else {
    console.error("Failed to connect to the database:", err);
    process.exit(1); // Exit the process if database connection fails
  }
});

app.get("/characters", async (req, res) => {
  try {
    const characters = await db.collection("characters").find().toArray();
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
