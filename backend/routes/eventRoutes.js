const express = require("express");
const router = express.Router();
const { createEvent, updateEvent, deleteEvent, getAllEvents, getEventById } = require("../controllers/eventController");

// admin routes
router.post("/create", createEvent);
router.put("/update/:id", updateEvent);
router.delete("/delete/:id", deleteEvent);

// user routes
router.get("/all", getAllEvents);
router.get("/:id", getEventById);

module.exports = router;