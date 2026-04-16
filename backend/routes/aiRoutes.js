const express = require("express");
const router = express.Router();
const { chatAssistant, generateDescription } = require("../controllers/aiController");

router.post("/chat", chatAssistant);
router.post("/generate-desc", generateDescription);

module.exports = router;
