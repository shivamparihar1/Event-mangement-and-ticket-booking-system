const Booking = require("../models/Booking");

// create booking
const createBooking = async (req, res) => {
  try {
    const { eventId, userName, seats } = req.body;

    const booking = new Booking({
      eventId,
      userName,
      seats,
    });

    await booking.save();

    res.status(201).json({ message: "Booking successful", booking });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createBooking };

