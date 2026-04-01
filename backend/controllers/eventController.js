const Event = require("../models/Event");

// CREATE EVENT
const createEvent = async (req, res) => {
  const { title, description, date, location, price, totalSeats, category } = req.body;

  if (!title || !description || !date || !location || !price || !totalSeats || !category) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const event = await Event.create({
    title,
    description,
    date,
    location,
    price,
    totalSeats,
    availableSeats: totalSeats, // initially available = total
    category,
  });

  res.status(201).json({
    message: "Event created successfully",
    event,
  });
};

// UPDATE EVENT
const updateEvent = async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    return res.status(404).json({ message: "Event not found" });
  }

  const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json({
    message: "Event updated successfully",
    event: updatedEvent,
  });
};

// DELETE EVENT
const deleteEvent = async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    return res.status(404).json({ message: "Event not found" });
  }

  await Event.findByIdAndDelete(req.params.id);

  res.status(200).json({ message: "Event deleted successfully" });
};

module.exports = { createEvent, updateEvent, deleteEvent };