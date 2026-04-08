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

// GET ALL BOOKINGS
const getAllBookings = async (req, res) => {
  const bookings = await Booking.find()
    .populate("userId", "name email")
    .populate("eventId", "title date location price");

  if (bookings.length === 0) {
    return res.status(404).json({ message: "No bookings found" });
  }

  res.status(200).json({
    message: "All bookings fetched successfully",
    totalBookings: bookings.length,
    bookings,
  });
};

// CANCEL BOOKING
const cancelBooking = async (req, res) => {
  const { bookingId } = req.params;

  // find booking
  const booking = await Booking.findById(bookingId);
  if (!booking) {
    return res.status(404).json({ message: "Booking not found" });
  }

  // check if booking already cancelled
  if (booking.status === "cancelled") {
    return res.status(400).json({ message: "Booking already cancelled" });
  }

  // increase event available seats
  const event = await Event.findById(booking.eventId);
  if (event) {
    event.availableSeats = event.availableSeats + booking.ticketsBooked;
    await event.save();
  }

  // booking status cancelled
  booking.status = "cancelled";
  await booking.save();

  res.status(200).json({
    message: "Booking cancelled successfully",
    booking,
  });
};

module.exports = { bookTicket, getMyBookings, getAllBookings, cancelBooking };