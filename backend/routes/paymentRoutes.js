const express = require("express");
const router = express.Router();
const { createOrder, verifyPayment, cashBooking } = require("../controllers/paymentController");

router.post("/create-order", createOrder);   // Step 1: create Razorpay order
router.post("/verify", verifyPayment);        // Step 2: verify payment & confirm booking
router.post("/cash", cashBooking);            // Cash / Pay at venue

module.exports = router;
