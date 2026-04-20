const crypto = require("crypto");
const Booking = require("../models/Booking");
const Event = require("../models/Event");
const jwt = require("jsonwebtoken");

// ── MOCK: Create Payment Order ──
const createOrder = async (req, res) => {
  const { amount, receipt } = req.body;
  if (!amount) return res.status(400).json({ message: "Amount is required" });

  // Generate mock order ID
  const orderId = "mock_ord_" + crypto.randomBytes(8).toString("hex");

  res.status(200).json({
    success: true,
    orderId,
    amount,
    currency: "INR",
  });
};

// ── MOCK: Verify Payment & Confirm Booking ──
const verifyPayment = async (req, res) => {
  const { orderId, paymentId, userId, eventId, ticketsBooked } = req.body;

  if (!orderId || !paymentId || !userId || !eventId || !ticketsBooked)
    return res.status(400).json({ message: "Missing payment details" });

  const event = await Event.findById(eventId);
  if (!event) return res.status(404).json({ message: "Event not found" });

  if (event.availableSeats < ticketsBooked)
    return res.status(400).json({ message: "Not enough seats" });

  const totalPrice = event.price * ticketsBooked;

  const booking = await Booking.create({
    userId,
    eventId,
    ticketsBooked,
    totalPrice,
    paymentMethod: "online",
    paymentStatus: "paid",
    razorpayOrderId: orderId,
    razorpayPaymentId: paymentId,
    status: "confirmed",
  });

  event.availableSeats -= ticketsBooked;
  await event.save();

  const ticketToken = jwt.sign(
    { bookingId: booking._id, userId, eventId },
    process.env.JWT_SECRET,
    { expiresIn: "365d" }
  );

  res.status(201).json({
    success: true,
    message: "Payment confirmed & booking created",
    booking,
    ticketToken,
  });
};

// ── CASH: Pay at Venue ──
const cashBooking = async (req, res) => {
  const { userId, eventId, ticketsBooked } = req.body;

  if (!userId || !eventId || !ticketsBooked)
    return res.status(400).json({ message: "All fields are required" });

  const event = await Event.findById(eventId);
  if (!event) return res.status(404).json({ message: "Event not found" });

  if (event.availableSeats < ticketsBooked)
    return res.status(400).json({ message: "Not enough seats available" });

  const totalPrice = event.price * ticketsBooked;

  const booking = await Booking.create({
    userId,
    eventId,
    ticketsBooked,
    totalPrice,
    paymentMethod: "cash",
    paymentStatus: "pending",
    status: "confirmed",
  });

  event.availableSeats -= ticketsBooked;
  await event.save();

  const ticketToken = jwt.sign(
    { bookingId: booking._id, userId, eventId },
    process.env.JWT_SECRET,
    { expiresIn: "365d" }
  );

  res.status(201).json({
    success: true,
    message: "Cash booking reserved. Pay at the venue.",
    booking,
    ticketToken,
  });
};

module.exports = { createOrder, verifyPayment, cashBooking };
