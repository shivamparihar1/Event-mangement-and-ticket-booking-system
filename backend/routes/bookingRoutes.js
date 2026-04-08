const express = require("express");
const router = express.Router();
const { bookTicket, getMyBookings, getAllBookings, cancelBooking } = require("../controllers/bookingController");

router.post("/book", bookTicket);
router.get("/mybookings/:userId", getMyBookings);
router.get("/allbookings", getAllBookings);
router.put("/cancel/:bookingId", cancelBooking);

module.exports = router;