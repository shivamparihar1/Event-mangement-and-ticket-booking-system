const Booking = require("../models/Booking");
const Event = require("../models/Event");
const jwt = require("jsonwebtoken");

// BOOK A TICKET
const bookTicket = async (req, res) => {
  const { userId, eventId, ticketsBooked } = req.body;

  if (!userId || !eventId || !ticketsBooked)
    return res.status(400).json({ message: "All fields are required" });

  const event = await Event.findById(eventId);
  if (!event) return res.status(404).json({ message: "Event not found" });

  if (event.availableSeats < ticketsBooked)
    return res.status(400).json({ message: "Not enough seats available" });

  const totalPrice = event.price * ticketsBooked;

  const booking = await Booking.create({ userId, eventId, ticketsBooked, totalPrice });

  event.availableSeats = event.availableSeats - ticketsBooked;
  await event.save();

  // Generate a signed JWT ticket token (expires in 1 year for simplicity)
  const ticketToken = jwt.sign(
    { bookingId: booking._id, userId, eventId },
    process.env.JWT_SECRET,
    { expiresIn: "365d" }
  );

  res.status(201).json({
    message: "Ticket booked successfully",
    booking,
    ticketToken,
  });
};

// GET MY BOOKINGS (with ticket tokens)
const getMyBookings = async (req, res) => {
  const { userId } = req.params;

  const bookings = await Booking.find({ userId }).populate("eventId", "title date location price category");

  if (bookings.length === 0)
    return res.status(404).json({ message: "No bookings found" });

  // Attach a signed ticket token to each booking
  const bookingsWithTokens = bookings.map((b) => {
    const ticketToken = jwt.sign(
      { bookingId: b._id, userId: b.userId, eventId: b.eventId?._id },
      process.env.JWT_SECRET,
      { expiresIn: "365d" }
    );
    return { ...b.toObject(), ticketToken };
  });

  res.status(200).json({
    message: "Bookings fetched successfully",
    totalBookings: bookings.length,
    bookings: bookingsWithTokens,
  });
};

// GET ALL BOOKINGS (admin)
const getAllBookings = async (req, res) => {
  const bookings = await Booking.find()
    .populate("userId", "name email")
    .populate("eventId", "title date location price");

  if (bookings.length === 0)
    return res.status(404).json({ message: "No bookings found" });

  res.status(200).json({
    message: "All bookings fetched successfully",
    totalBookings: bookings.length,
    bookings,
  });
};

// CANCEL BOOKING
const cancelBooking = async (req, res) => {
  const { bookingId } = req.params;

  const booking = await Booking.findById(bookingId);
  if (!booking) return res.status(404).json({ message: "Booking not found" });

  if (booking.status === "cancelled")
    return res.status(400).json({ message: "Booking already cancelled" });

  const event = await Event.findById(booking.eventId);
  if (event) {
    event.availableSeats = event.availableSeats + booking.ticketsBooked;
    await event.save();
  }

  booking.status = "cancelled";
  await booking.save();

  res.status(200).json({ message: "Booking cancelled successfully", booking });
};

// VERIFY QR TICKET TOKEN
const verifyTicket = async (req, res) => {
  const { token } = req.params;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const booking = await Booking.findById(decoded.bookingId)
      .populate("userId", "name email")
      .populate("eventId", "title date location category");

    if (!booking)
      return res.status(404).json({ valid: false, message: "Booking not found" });

    res.status(200).json({
      valid: booking.status === "confirmed",
      status: booking.status,
      booking: {
        id: booking._id,
        event: booking.eventId?.title,
        date: booking.eventId?.date,
        location: booking.eventId?.location,
        category: booking.eventId?.category,
        tickets: booking.ticketsBooked,
        totalPrice: booking.totalPrice,
        holder: booking.userId?.name,
        email: booking.userId?.email,
      },
    });
  } catch (err) {
    res.status(400).json({ valid: false, message: "Invalid or expired ticket token" });
  }
};

module.exports = { bookTicket, getMyBookings, getAllBookings, cancelBooking, verifyTicket };