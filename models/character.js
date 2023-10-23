const mongoose = require("mongoose");

const characterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  village: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
  overall: {
    type: Number,
    required: true,
  },
  iq: {
    type: Number,
    required: true,
  },
  abilities: {
    type: Number,
    required: true,
  },
  natureIcons: [
    {
      type: String, // Assuming these are URLs to images
      required: true,
    },
  ],
  natureLabels: [
    {
      type: String,
      required: true,
    },
  ],
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageIcon: {
    type: String,
    required: true,
  },
});

const Character = mongoose.model("Character", characterSchema);

module.exports = Character;
