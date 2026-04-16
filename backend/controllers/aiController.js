const Event = require("../models/Event");

// 1. SIMULATED AI CHATBOT
const chatAssistant = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ reply: "Please say something!" });

    const lowerStr = message.toLowerCase();
    
    // Extract intent/keywords
    const categories = ["technical", "cultural", "sports", "workshop", "seminar", "music", "business", "health", "food"];
    const cities = ["mumbai", "delhi", "bengaluru", "hyderabad", "chennai", "pune", "kolkata"];
    
    let matchedCategory = null;
    let matchedCity = null;
    let maxPrice = null;

    categories.forEach(cat => { if (lowerStr.includes(cat)) matchedCategory = cat; });
    cities.forEach(city => { if (lowerStr.includes(city)) matchedCity = city; });

    // Extract price if user mentions "under 500", "<1000", "cheap"
    const priceMatch = lowerStr.match(/(?:under|below|max|cheapest|\<)\s*r?s?\.?\s*(\d+)/i);
    if (priceMatch) {
      maxPrice = parseInt(priceMatch[1]);
    }

    // Common intents & Customer Support
    if (lowerStr.includes("support") || lowerStr.includes("human") || lowerStr.includes("help") || lowerStr.includes("contact") || lowerStr.includes("issue")) {
       return res.status(200).json({ reply: "I am an AI assistant! If you need human assistance regarding your bookings or account, our **Customer Support Team** is ready to help you at **support@eventsphere.com**. They usually reply within 24 hours!" });
    }

    if (lowerStr.includes("hi") || lowerStr.includes("hello")) {
       return res.status(200).json({ reply: "Hello! I am EventSphere's AI Assistant. You can ask me to find events, for example: 'Find music events in Mumbai under Rs 1000'." });
    }

    // Build DB Query
    let query = {};
    if (matchedCategory) query.category = new RegExp(matchedCategory, 'i');
    if (matchedCity) query.location = new RegExp(matchedCity, 'i');
    if (maxPrice) query.price = { $lte: maxPrice };

    // Fetch from DB
    const events = await Event.find(query).limit(3);

    // Build text response
    let reply = "";
    if (events.length === 0) {
      reply = `I couldn't find any events matching your criteria. Try adjusting your city, category, or budget!`;
    } else {
      reply = `I found ${events.length} event(s) for you! \\n`;
      events.forEach(e => {
        reply += `- **${e.title}** in ${e.location.split(',')[0]} (₹${e.price}) \\n`;
      });
      reply += `\\nYou can find more details on the Events page!`;
    }

    res.status(200).json({ reply });

  } catch (error) {
    res.status(500).json({ reply: "My AI circuits are overloaded. Please try again later." });
  }
};

// 2. SIMULATED AI DESCRIPTION GENERATOR
const generateDescription = async (req, res) => {
  try {
    const { title, category } = req.body;
    
    if (!title || !category) {
      return res.status(400).json({ description: "Please provide a title and category to generate a description." });
    }

    const templates = [
      `Get ready for **${title}**, the most highly anticipated ${category} event of the year! Whether you are a passionate enthusiast or a curious beginner, this event promises to deliver unforgettable experiences, top-tier networking opportunities, and insights that you won't find anywhere else.`,
      `Join us at **${title}**! Dive deep into the world of ${category} with industry professionals and like-minded peers. Expect a day filled with engaging sessions, interactive activities, and plenty of moments to inspire your journey. Grab your tickets before they sell out!`,
      `Experience the magic of **${title}**. We are bringing the best of ${category} directly to you. This is your chance to discover new trends, meet incredible people, and be part of an exclusive community. Don't miss out on what is set to be a spectacular occasion.`
    ];

    const randomDesc = templates[Math.floor(Math.random() * templates.length)];

    res.status(200).json({ description: randomDesc });
    
  } catch (error) {
    res.status(500).json({ description: "Failed to generate description due to a server error." });
  }
};

module.exports = { chatAssistant, generateDescription };
