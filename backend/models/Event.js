const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    totalSeats: {
      type: Number,
      required: true,
    },
    availableSeats: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&auto=format&fit=crop&q=60",
    },
    createdBy: {
      type: String,
      default: "admin",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);