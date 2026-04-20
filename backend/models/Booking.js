const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    ticketsBooked: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["confirmed", "cancelled", "pending"],
      default: "confirmed",
    },
    // Payment fields
    paymentMethod: {
      type: String,
      enum: ["online", "cash"],
      default: "online",
    },
    paymentStatus: {
      type: String,
      enum: ["paid", "pending", "failed", "refunded"],
      default: "pending",
    },
    razorpayOrderId: { type: String, default: null },
    razorpayPaymentId: { type: String, default: null },
    razorpaySignature: { type: String, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);