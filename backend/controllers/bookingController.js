const Booking = require("../models/Booking");
const Event = require("../models/Event");

// BOOK A TICKET
const bookTicket = async (req, res) => {
  const { userId, eventId, ticketsBooked } = req.body;

  if (!userId || !eventId || !ticketsBooked) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const event = await Event.findById(eventId);
  if (!event) {
    return res.status(404).json({ message: "Event not found" });
  }

  if (event.availableSeats < ticketsBooked) {
    return res.status(400).json({ message: "Not enough seats available" });
  }

  const totalPrice = event.price * ticketsBooked;

  const booking = await Booking.create({
    userId,
    eventId,
    ticketsBooked,
    totalPrice,
  });

  event.availableSeats = event.availableSeats - ticketsBooked;
  await event.save();

  res.status(201).json({
    message: "Ticket booked successfully",
    booking,
  });
};

// GET MY BOOKINGS
const getMyBookings = async (req, res) => {
  const { userId } = req.params;

  // us user ki saari bookings dhundho
  // populate se eventId ki jagah pura event ka data aayega
  const bookings = await Booking.find({ userId }).populate("eventId", "title date location price category");

  if (bookings.length === 0) {
    return res.status(404).json({ message: "No bookings found" });
  }

  res.status(200).json({
    message: "Bookings fetched successfully",
    totalBookings: bookings.length,
    bookings,
  });
};

module.exports = { bookTicket, getMyBookings };