const express = require("express");
const router = express.Router();
const { bookTicket, getMyBookings } = require("../controllers/bookingController");

router.post("/book", bookTicket);
router.get("/mybookings/:userId", getMyBookings);

module.exports = router;