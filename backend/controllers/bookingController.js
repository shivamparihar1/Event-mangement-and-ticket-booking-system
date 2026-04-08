const Booking = require("../models/Booking");
const Event = require("../models/Event");

// BOOK A TICKET
const bookTicket = async (req, res) => {
  const { userId, eventId, ticketsBooked } = req.body;

  if (!userId || !eventId || !ticketsBooked) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // check event exists
  const event = await Event.findById(eventId);
  if (!event) {
    return res.status(404).json({ message: "Event not found" });
  }

  // check seats available
  if (event.availableSeats < ticketsBooked) {
    return res.status(400).json({ message: "Not enough seats available" });
  }

  // calculate total price
  const totalPrice = event.price * ticketsBooked;

  // save booking
  const booking = await Booking.create({
    userId,
    eventId,
    ticketsBooked,
    totalPrice,
  });

  // reduce available seats in event
  event.availableSeats = event.availableSeats - ticketsBooked;
  await event.save();

  res.status(201).json({
    message: "Ticket booked successfully",
    booking,
  });
};

module.exports = { bookTicket };