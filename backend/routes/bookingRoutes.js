const express = require("express");
const router = express.Router();
const { bookTicket, getMyBookings, getAllBookings, cancelBooking, verifyTicket } = require("../controllers/bookingController");

router.post("/book", bookTicket);
router.get("/mybookings/:userId", getMyBookings);
router.get("/allbookings", getAllBookings);
router.put("/cancel/:bookingId", cancelBooking);
router.get("/verify/:token", verifyTicket);  // QR ticket verification

module.exports = router;