require("dotenv").config();
const mongoose = require("mongoose");

const uri = process.env.MONGODB_URI;

mongoose.connect(uri, {
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
});

module.exports = dbConnection;
