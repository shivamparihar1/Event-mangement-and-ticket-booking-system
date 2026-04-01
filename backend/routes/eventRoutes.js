const express = require("express");
const router = express.Router();
const { createEvent, updateEvent, deleteEvent } = require("../controllers/eventController");

// admin routes
router.post("/create", createEvent);
router.put("/update/:id", updateEvent);
router.delete("/delete/:id", deleteEvent);

module.exports = router;