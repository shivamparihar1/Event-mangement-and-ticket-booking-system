const express = require("express");
const router = express.Router();
const { bookTicket, getMyBookings, getAllBookings } = require("../controllers/bookingController");

router.post("/book", bookTicket);
router.get("/mybookings/:userId", getMyBookings);
router.get("/allbookings", getAllBookings);   // admin route

module.exports = router;